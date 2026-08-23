import React, { useState, useEffect } from 'react';
import {
  Pickaxe,
  BookOpen,
  Wifi,
  WifiOff,
  Download,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calculator,
  Globe,
  Search,
  Bot,
  Award,
  Layers,
  Compass,
  Zap,
  HardDrive,
  RefreshCw,
  Check,
  X,
  BarChart3,
  CheckSquare,
  Sparkles,
  MapPin,
  Clock,
  FolderDown,
  Cpu,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Bell,
  Filter,
  DollarSign,
  HelpCircle,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileCode,
  Activity,
  Layers3,
  Flame,
  Radio,
  Share2,
  MessageSquare,
  Plus,
  ThumbsUp,
  MessageCircle,
  Trophy,
  TrendingUp,
  PieChart,
  Library,
  Send,
  Edit3,
  Trash2,
  FileDown,
  Printer,
  Star,
  Building2,
  GraduationCap,
  School,
  Mail,
  Phone,
  Map
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';
import {
  StudyModule,
  GlobalMiningZone,
  DownloadableResource,
  OceanMiningJob,
  EngineeringStudyDetail,
  ForumThread,
  ResearchPaper,
  GamificationMilestone,
  OceanMiningInstitute,
  InstituteInquiry,
  INITIAL_STUDY_MODULES,
  GLOBAL_MINING_ZONES,
  TECHNICAL_RESOURCES,
  OCEAN_MINING_JOBS,
  ENGINEERING_STUDY_DETAILS,
  INITIAL_FORUM_THREADS,
  INITIAL_GAMIFICATION_MILESTONES,
  INITIAL_RESEARCH_PAPERS,
  INITIAL_OCEAN_MINING_INSTITUTES
} from '../data/oceanMiningData';
import { GlobalInstitutesMap } from './GlobalInstitutesMap';

export const OceanMiningEngineeringPortalView: React.FC = () => {
  // Main Portal Navigation & Mode State
  const [portalMode, setPortalMode] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [activeTab, setActiveTab] = useState<
    | 'CURRICULUM'
    | 'PROGRESS_TRACKER'
    | 'STUDY_TIMER'
    | 'OFFLINE_QUIZ_MODE'
    | 'ENGINEERING_DETAILS'
    | 'WORLDWIDE_INTEL'
    | 'RESOURCES_DOWNLOADS'
    | 'SYNC_CONTROL'
    | 'SIMULATOR'
    | 'AI_TUTOR'
    | 'JOBS_CAREERS'
    | 'PEER_FORUM'
    | 'GAMIFICATION_BADGES'
    | 'STUDY_ANALYTICS'
    | 'RESEARCH_LIBRARY'
    | 'INSTITUTES_DIRECTORY'
  >('CURRICULUM');

  // Ocean Mining Institutes & Universities State
  const [institutes, setInstitutes] = useState<OceanMiningInstitute[]>(INITIAL_OCEAN_MINING_INSTITUTES);
  const [instituteViewMode, setInstituteViewMode] = useState<'map' | 'grid' | 'split'>('split');
  const [instituteRegionFilter, setInstituteRegionFilter] = useState<string>('ALL');
  const [instituteDegreeFilter, setInstituteDegreeFilter] = useState<string>('ALL');
  const [instituteSearchQuery, setInstituteSearchQuery] = useState<string>('');
  const [onlyBookmarkedInstitutes, setOnlyBookmarkedInstitutes] = useState<boolean>(false);
  const [selectedInstitute, setSelectedInstitute] = useState<OceanMiningInstitute | null>(null);

  // University Admissions & Research Inquiry State
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [inquiryInstitute, setInquiryInstitute] = useState<OceanMiningInstitute | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    applicantName: '',
    email: '',
    phone: '',
    country: 'India',
    qualification: 'B.Tech / B.Sc Graduate',
    programType: 'M.Tech / M.Sc Degrees',
    inquiryType: 'Admissions' as 'Admissions' | 'Research Collaboration' | 'ISA Fellowship' | 'Campus Visit',
    message: ''
  });
  const [inquiriesList, setInquiriesList] = useState<InstituteInquiry[]>([]);
  const [inquiryToast, setInquiryToast] = useState<string | null>(null);

  // Search, Modules & Resources State with Bookmarking & Annotations
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  const [onlyAnnotated, setOnlyAnnotated] = useState<boolean>(false);
  const [editingAnnotationId, setEditingAnnotationId] = useState<string | null>(null);
  const [annotationInput, setAnnotationInput] = useState<string>('');
  const [modules, setModules] = useState<StudyModule[]>(INITIAL_STUDY_MODULES);
  const [resources, setResources] = useState<DownloadableResource[]>(TECHNICAL_RESOURCES);

  // Peer Discussion Forum State
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_FORUM_THREADS);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [forumCategoryFilter, setForumCategoryFilter] = useState<string>('ALL');
  const [forumSearchQuery, setForumSearchQuery] = useState<string>('');
  const [newReplyContent, setNewReplyContent] = useState<string>('');
  const [showNewThreadModal, setShowNewThreadModal] = useState<boolean>(false);
  const [newThreadTitle, setNewThreadTitle] = useState<string>('');
  const [newThreadCategory, setNewThreadCategory] = useState<string>('Riser Hydraulics & Slurry Transport');
  const [newThreadContent, setNewThreadContent] = useState<string>('');
  const [newThreadTags, setNewThreadTags] = useState<string>('Subsea, CCZ');

  // Gamified Milestones & XP System State
  const [milestones, setMilestones] = useState<GamificationMilestone[]>(INITIAL_GAMIFICATION_MILESTONES);
  const [claimedRewardToast, setClaimedRewardToast] = useState<string | null>(null);

  // R&D Library & R&D AI Chatbot State
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>(INITIAL_RESEARCH_PAPERS);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [paperSearchQuery, setPaperSearchQuery] = useState<string>('');
  const [paperCategoryFilter, setPaperCategoryFilter] = useState<string>('ALL');
  const [rdChatQuery, setRdChatQuery] = useState<string>('');
  const [rdChatHistory, setRdChatHistory] = useState<
    { sender: 'USER' | 'AI'; text: string; citations?: string[]; timestamp: string }[]
  >([
    {
      sender: 'AI',
      text: 'Welcome to the R&D Scientific Library AI Assistant! I am grounded in peer-reviewed deep-sea engineering literature, CFD riser hydraulic models, and ISA compliance whitepapers. Ask me to cite equations or explain specific research findings.',
      citations: ['Thorne et al. (2026)', 'Tanaka et al. (2025)', 'Santos et al. (2026)'],
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isRdChatThinking, setIsRdChatThinking] = useState<boolean>(false);

  // Deep Sea Mining Details View State
  const [selectedDetail, setSelectedDetail] = useState<EngineeringStudyDetail>(ENGINEERING_STUDY_DETAILS[0]);

  // Offline Quiz Runner State
  const [quizModule, setQuizModule] = useState<StudyModule>(INITIAL_STUDY_MODULES[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizTimerSeconds, setQuizTimerSeconds] = useState<number>(300); // 5 minute quiz timer
  const [quizTimerActive, setQuizTimerActive] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<
    { moduleCode: string; title: string; score: number; total: number; date: string }[]
  >([
    {
      moduleCode: 'OME-NOD-401',
      title: 'Abyssal Plain Manganese Nodule Harvesting',
      score: 2,
      total: 2,
      date: '2026-08-21 14:30'
    }
  ]);

  // Study Session Timer State
  const [studyTimerSeconds, setStudyTimerSeconds] = useState<number>(1500); // 25 min default Pomodoro
  const [studyTimerPreset, setStudyTimerPreset] = useState<number>(1500);
  const [isStudyTimerRunning, setIsStudyTimerRunning] = useState<boolean>(false);
  const [totalLoggedStudyMinutes, setTotalLoggedStudyMinutes] = useState<number>(180); // 3 hours starting
  const [timerToast, setTimerToast] = useState<string | null>(null);

  // Jobs Opportunities & Alert System State
  const [jobs, setJobs] = useState<OceanMiningJob[]>(OCEAN_MINING_JOBS);
  const [jobSearchQuery, setJobSearchQuery] = useState<string>('');
  const [jobCategoryFilter, setJobCategoryFilter] = useState<string>('ALL');
  const [selectedJobToApply, setSelectedJobToApply] = useState<OceanMiningJob | null>(null);
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  
  // Job Alert Modal State
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertKeyword, setAlertKeyword] = useState<string>('ROV Pilot');
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertFreq, setAlertFreq] = useState<'DAILY' | 'WEEKLY' | 'IMMEDIATE'>('IMMEDIATE');
  const [activeAlerts, setActiveAlerts] = useState<
    { id: string; keyword: string; email: string; freq: string }[]
  >([
    { id: 'alt-1', keyword: 'ROV Pilot & Subsea Hydraulics', email: 'mrajukadugodi@gmail.com', freq: 'IMMEDIATE' }
  ]);
  const [alertCreatedToast, setAlertCreatedToast] = useState<string | null>(null);

  // Subsea CAD Engineering Calculator Simulator State
  const [simDepthMeters, setSimDepthMeters] = useState<number>(4000);
  const [simNoduleDensityKgM2, setSimNoduleDensityKgM2] = useState<number>(12);
  const [simMiningSpeedKnots, setSimMiningSpeedKnots] = useState<number>(0.8);
  const [simCrawlerWidthM, setSimCrawlerWidthM] = useState<number>(10);
  const [simMetalPricePerTonUSD, setSimMetalPricePerTonUSD] = useState<number>(4500);

  // AI Ocean Mining Tutor State
  const [tutorQuery, setTutorQuery] = useState<string>('');
  const [tutorChatHistory, setTutorChatHistory] = useState<
    { sender: 'USER' | 'AI'; text: string; timestamp: string }[]
  >([
    {
      sender: 'AI',
      text: 'Greetings Engineer! I am your AI Ocean Mining & Subsea Geotechnics Tutor. Ask me anything regarding 4000m riser hydraulics, CCZ nodule density, Seafloor Massive Sulfides, ISA Mining Code regulations, or benthic plume dynamics.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTutorThinking, setIsTutorThinking] = useState<boolean>(false);

  // Offline Sync Manager Settings
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [syncNetworkPreference, setSyncNetworkPreference] = useState<'VSAT_SATELLITE' | 'WIFI_ONLY' | 'ANY'>('VSAT_SATELLITE');
  const [autoDownloadSyllabus, setAutoDownloadSyllabus] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('2026-08-22 11:20 UTC');
  const [storageUsedMb, setStorageUsedMb] = useState<number>(1240); // 1.24 GB
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  const [pendingSyncItems, setPendingSyncItems] = useState<string[]>([
    'Quiz Result: OME-NOD-401 (Passed 100%)',
    'Quiz Result: OME-COB-601 (Passed 100%)',
    'Cached Manual: Subsea Engineering Formulas Quick Reference Guide'
  ]);

  // Selected Zone for Worldwide Intel
  const [selectedZone, setSelectedZone] = useState<GlobalMiningZone>(GLOBAL_MINING_ZONES[0]);

  // Effect for Study Session Timer Countdown
  useEffect(() => {
    let interval: any = null;
    if (isStudyTimerRunning && studyTimerSeconds > 0) {
      interval = setInterval(() => {
        setStudyTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (studyTimerSeconds === 0 && isStudyTimerRunning) {
      setIsStudyTimerRunning(false);
      hapticEngine.trigger('success');
      const minutesLogged = Math.round(studyTimerPreset / 60);
      setTotalLoggedStudyMinutes((prev) => prev + minutesLogged);
      setTimerToast(`Study Session Complete! +${minutesLogged} minutes logged into your progress profile.`);
      setTimeout(() => setTimerToast(null), 5000);
    }
    return () => clearInterval(interval);
  }, [isStudyTimerRunning, studyTimerSeconds, studyTimerPreset]);

  // Effect for Quiz Timer Countdown
  useEffect(() => {
    let interval: any = null;
    if (quizTimerActive && quizTimerSeconds > 0 && !quizSubmitted) {
      interval = setInterval(() => {
        setQuizTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (quizTimerSeconds === 0 && quizTimerActive && !quizSubmitted) {
      setQuizTimerActive(false);
      handleFinishQuiz();
    }
    return () => clearInterval(interval);
  }, [quizTimerActive, quizTimerSeconds, quizSubmitted]);

  // Calculations for Progress Tracker
  const completedModulesCount = modules.filter((m) => m.isCompleted).length;
  const totalModulesCount = modules.length;
  const progressPercentage = Math.round((completedModulesCount / totalModulesCount) * 100);
  const totalHoursCompleted = modules
    .filter((m) => m.isCompleted)
    .reduce((acc, curr) => acc + curr.durationHours, 0);

  // Bookmark handlers
  const handleToggleBookmarkModule = (modId: string) => {
    hapticEngine.trigger('click');
    setModules((prev) =>
      prev.map((m) => (m.id === modId ? { ...m, isBookmarked: !m.isBookmarked } : m))
    );
  };

  const handleToggleBookmarkResource = (resId: string) => {
    hapticEngine.trigger('click');
    setResources((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  // Completion toggle
  const handleToggleModuleCompletion = (modId: string) => {
    hapticEngine.trigger('click');
    setModules((prev) =>
      prev.map((m) => (m.id === modId ? { ...m, isCompleted: !m.isCompleted } : m))
    );
  };

  // Download resource
  const handleToggleDownloadResource = (resId: string) => {
    hapticEngine.trigger('success');
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === resId) {
          const nextStatus = r.downloadStatus === 'DOWNLOADED' ? 'NOT_DOWNLOADED' : 'DOWNLOADED';
          return { ...r, downloadStatus: nextStatus };
        }
        return r;
      })
    );
  };

  // Manual Sync trigger
  const handleTriggerManualSync = () => {
    hapticEngine.trigger('success');
    setIsSyncing(true);
    setSyncStatusMsg('Connecting to Satellite VSAT Vessel Server...');

    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC');
      setPendingSyncItems([]);
      setSyncStatusMsg('Sync Complete! All offline study logs & exam scores saved to vault.');
      setTimeout(() => setSyncStatusMsg(null), 4000);
    }, 1500);
  };

  // Clear cache handler
  const handleClearCache = (type: string) => {
    hapticEngine.trigger('click');
    setStorageUsedMb((prev) => Math.max(200, prev - 350));
    setSyncStatusMsg(`Cleared ${type} cache! Reduced storage footprint.`);
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  // Quiz Mode handlers
  const handleStartQuiz = (mod: StudyModule) => {
    hapticEngine.trigger('click');
    setQuizModule(mod);
    setCurrentQuestionIndex(0);
    setUserQuizAnswers({});
    setQuizSubmitted(false);
    setQuizTimerSeconds(300);
    setQuizTimerActive(true);
    setActiveTab('OFFLINE_QUIZ_MODE');
  };

  const handleAnswerQuestion = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    hapticEngine.trigger('click');
    setUserQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleFinishQuiz = () => {
    hapticEngine.trigger('success');
    setQuizSubmitted(true);
    setQuizTimerActive(false);

    let correctCount = 0;
    quizModule.quizQuestions.forEach((q, idx) => {
      if (userQuizAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    // Save to history
    setQuizHistory((prev) => [
      {
        moduleCode: quizModule.code,
        title: quizModule.title,
        score: correctCount,
        total: quizModule.quizQuestions.length,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16)
      },
      ...prev
    ]);

    // Auto mark module completed if passed >= 50%
    if (correctCount / quizModule.quizQuestions.length >= 0.5) {
      setModules((prev) =>
        prev.map((m) => (m.id === quizModule.id ? { ...m, isCompleted: true } : m))
      );
    }
  };

  // Timer controls
  const handleStartPauseStudyTimer = () => {
    hapticEngine.trigger('click');
    setIsStudyTimerRunning(!isStudyTimerRunning);
  };

  const handleResetStudyTimer = () => {
    hapticEngine.trigger('click');
    setIsStudyTimerRunning(false);
    setStudyTimerSeconds(studyTimerPreset);
  };

  const handleSelectPresetTimer = (seconds: number) => {
    hapticEngine.trigger('click');
    setIsStudyTimerRunning(false);
    setStudyTimerPreset(seconds);
    setStudyTimerSeconds(seconds);
  };

  // Job alert creation
  const handleCreateJobAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertKeyword.trim() || !alertEmail.trim()) return;

    hapticEngine.trigger('success');
    const newAlert = {
      id: `alt-${Date.now()}`,
      keyword: alertKeyword.trim(),
      email: alertEmail.trim(),
      freq: alertFreq
    };
    setActiveAlerts((prev) => [newAlert, ...prev]);
    setShowAlertModal(false);
    setAlertCreatedToast(`Job Alert for "${alertKeyword}" activated! Confirmation sent to ${alertEmail}.`);
    setTimeout(() => setAlertCreatedToast(null), 5000);
  };

  // Job apply handler
  const handleApplyToJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobToApply) return;

    hapticEngine.trigger('success');
    setApplySuccessMsg(`Application successfully submitted for ${selectedJobToApply.title} at ${selectedJobToApply.company}!`);
    setTimeout(() => {
      setApplySuccessMsg(null);
      setSelectedJobToApply(null);
    }, 4000);
  };

  // AI Tutor Ask
  const handleAskAITutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    hapticEngine.trigger('click');
    const userMsg = tutorQuery.trim();
    const nowStr = new Date().toLocaleTimeString();

    setTutorChatHistory((prev) => [
      ...prev,
      { sender: 'USER', text: userMsg, timestamp: nowStr }
    ]);
    setTutorQuery('');
    setIsTutorThinking(true);

    setTimeout(() => {
      let aiResponse = '';
      const lower = userMsg.toLowerCase();

      if (lower.includes('riser') || lower.includes('pump') || lower.includes('lift')) {
        aiResponse = `Regarding riser hydraulics at ${simDepthMeters}m depth: For slurry mixture density ~1.2 t/m³, centrifugal lift pumps must overcome static head (~40 MPa) + hydraulic friction losses. Total estimated pump power requirement: ~${((simMiningSpeedKnots * 1852 * simCrawlerWidthM * simNoduleDensityKgM2 / 3600) * 0.08 * (simDepthMeters / 100)).toFixed(1)} kW.`;
      } else if (lower.includes('isa') || lower.includes('code') || lower.includes('law')) {
        aiResponse = 'ISA Mining Code mandates a 30-year exploration license, submission of an Environmental Impact Statement (EIS), Regional Environmental Management Plan (REMP) compliance, and Preservation Reference Zone (PRZ) buffering.';
      } else if (lower.includes('nodule') || lower.includes('ccz')) {
        aiResponse = `CCZ Nodules lie at 3,800 - 4,300m depth with average abundance of 10-15 kg/m². Key minerals: Nickel (1.3%), Copper (1.1%), Cobalt (0.22%), and Manganese (27%).`;
      } else {
        aiResponse = `Based on ISO 19901-4 & ISA standards at ${simDepthMeters}m depth under ${(1025 * 9.81 * simDepthMeters / 100000).toFixed(0)} bar hydrostatic pressure, subsea crawlers must maintain wide composite track pads to enforce bearing pressure under 4 kPa in hydrogel pelagic clays.`;
      }

      setTutorChatHistory((prev) => [
        ...prev,
        { sender: 'AI', text: aiResponse, timestamp: new Date().toLocaleTimeString() }
      ]);
      setIsTutorThinking(false);
    }, 1000);
  };

  // ----------------------------------------------------
  // 1. Resource Annotations Handlers
  // ----------------------------------------------------
  const handleSaveResourceAnnotation = (resId: string) => {
    if (!annotationInput.trim()) return;
    hapticEngine.trigger('success');
    const dateStr = new Date().toISOString().split('T')[0];
    setResources((prev) =>
      prev.map((r) =>
        r.id === resId
          ? {
              ...r,
              annotation: annotationInput.trim(),
              annotationDate: dateStr
            }
          : r
      )
    );
    setEditingAnnotationId(null);
    setAnnotationInput('');
  };

  const handleDeleteResourceAnnotation = (resId: string) => {
    hapticEngine.trigger('click');
    setResources((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, annotation: undefined, annotationDate: undefined } : r))
    );
  };

  // ----------------------------------------------------
  // 2. Export Study Progress Handler
  // ----------------------------------------------------
  const handleExportStudyProgress = () => {
    hapticEngine.trigger('success');
    const exportData = {
      portalTitle: "Ocean Mining & Offshore Engineering Studies Portal",
      exportTimestamp: new Date().toISOString(),
      userProfile: {
        rankTitle: userRankTitle,
        totalXp: totalUserXp,
        totalLoggedMinutes: totalLoggedStudyMinutes,
        totalLoggedHours: (totalLoggedStudyMinutes / 60).toFixed(1),
        progressPercentage: progressPercentage,
        completedModulesCount: completedModulesCount
      },
      completedModules: modules
        .filter((m) => m.isCompleted)
        .map((m) => ({ code: m.code, title: m.title, category: m.category, durationHours: m.durationHours })),
      quizHistory: quizHistory,
      unlockedMilestones: milestones
        .filter((b) => b.unlocked)
        .map((b) => ({ title: b.title, category: b.category, xpReward: b.xpReward, unlockedDate: b.unlockedDate })),
      resourceNotes: resources
        .filter((r) => r.annotation)
        .map((r) => ({ resourceTitle: r.title, note: r.annotation, date: r.annotationDate }))
    };

    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OceanMining_Study_Progress_Transcript_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSyncStatusMsg("Official Study Progress Transcript exported to device as JSON file!");
    setTimeout(() => setSyncStatusMsg(null), 5000);
  };

  // ----------------------------------------------------
  // 3. Peer Discussion Forum Handlers
  // ----------------------------------------------------
  const handleLikeThread = (threadId: string) => {
    hapticEngine.trigger('click');
    setForumThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, likes: t.likes + 1 } : t))
    );
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleLikeReply = (threadId: string, replyId: string) => {
    hapticEngine.trigger('click');
    setForumThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        const updatedReplies = t.replies.map((r) => (r.id === replyId ? { ...r, likes: r.likes + 1 } : r));
        return { ...t, replies: updatedReplies };
      })
    );
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread((prev) => {
        if (!prev) return null;
        const updatedReplies = prev.replies.map((r) => (r.id === replyId ? { ...r, likes: r.likes + 1 } : r));
        return { ...prev, replies: updatedReplies };
      });
    }
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThread || !newReplyContent.trim()) return;

    hapticEngine.trigger('success');
    const newReply = {
      id: `rep-${Date.now()}`,
      author: 'Eng. You (Subsea Lead)',
      role: 'Offshore Engineering Fellow',
      vesselOrInstitution: 'SPV Hidden Gem / Remote Portal',
      content: newReplyContent.trim(),
      postedDate: 'Just Now',
      likes: 0
    };

    setForumThreads((prev) =>
      prev.map((t) => {
        if (t.id !== selectedThread.id) return t;
        return {
          ...t,
          repliesCount: t.repliesCount + 1,
          replies: [...t.replies, newReply]
        };
      })
    );

    setSelectedThread((prev) =>
      prev
        ? {
            ...prev,
            repliesCount: prev.repliesCount + 1,
            replies: [...prev.replies, newReply]
          }
        : null
    );

    setNewReplyContent('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    hapticEngine.trigger('success');
    const tagsArr = newThreadTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newThread: ForumThread = {
      id: `thread-${Date.now()}`,
      category: newThreadCategory,
      title: newThreadTitle.trim(),
      author: 'Eng. You (Subsea Lead)',
      role: 'Offshore Engineer',
      vesselOrInstitution: 'Clarion-Clipperton Zone Expedition',
      postedDate: 'Just Now',
      likes: 1,
      repliesCount: 0,
      tags: tagsArr.length > 0 ? tagsArr : ['Subsea', 'Offshore'],
      content: newThreadContent.trim(),
      replies: []
    };

    setForumThreads((prev) => [newThread, ...prev]);
    setShowNewThreadModal(false);
    setNewThreadTitle('');
    setNewThreadContent('');
    setSelectedThread(newThread);
  };

  // ----------------------------------------------------
  // 4. Gamification Milestones & XP Calculations
  // ----------------------------------------------------
  const unlockedXp = milestones.filter((m) => m.unlocked).reduce((acc, curr) => acc + curr.xpReward, 0);
  const totalUserXp = unlockedXp + totalLoggedStudyMinutes * 2 + quizHistory.reduce((acc, q) => acc + q.score * 50, 0);

  let userRankTitle = 'Cadet Oceanographer (Level 1)';
  if (totalUserXp >= 2500) {
    userRankTitle = 'Deep-Sea Chief Ocean Engineer (Level 4)';
  } else if (totalUserXp >= 1500) {
    userRankTitle = 'Abyssal Hydraulics Lead (Level 3)';
  } else if (totalUserXp >= 600) {
    userRankTitle = 'Subsea Systems Specialist (Level 2)';
  }

  const handleClaimMilestone = (id: string) => {
    hapticEngine.trigger('success');
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              unlocked: true,
              progressCurrent: m.progressTarget,
              unlockedDate: new Date().toISOString().split('T')[0]
            }
          : m
      )
    );
    const badge = milestones.find((m) => m.id === id);
    if (badge) {
      setClaimedRewardToast(`Badge Unlocked! "${badge.title}" (+${badge.xpReward} XP)`);
      setTimeout(() => setClaimedRewardToast(null), 5000);
    }
  };

  // ----------------------------------------------------
  // 5. Research & Development AI Chatbot Handler
  // ----------------------------------------------------
  const handleToggleBookmarkPaper = (paperId: string) => {
    hapticEngine.trigger('click');
    setResearchPapers((prev) =>
      prev.map((p) => (p.id === paperId ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  const handleAskRdChatbot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rdChatQuery.trim()) return;

    hapticEngine.trigger('click');
    const query = rdChatQuery.trim();
    const nowStr = new Date().toLocaleTimeString();

    setRdChatHistory((prev) => [
      ...prev,
      { sender: 'USER', text: query, timestamp: nowStr }
    ]);
    setRdChatQuery('');
    setIsRdChatThinking(true);

    setTimeout(() => {
      let aiText = '';
      let citations: string[] = [];
      const lower = query.toLowerCase();

      if (lower.includes('durand') || lower.includes('velocity') || lower.includes('riser')) {
        aiText = `According to two-phase Eulerian CFD modeling of 4,000m vertical risers, the Durand critical settling velocity V_c = F_L * sqrt(2 * g * D * (S - 1)) ranges from 3.8 to 4.6 m/s for 20-80mm nodule diameters. Below 3.6 m/s, dense nodule deposition causes severe clogging near the subsea pump intake.`;
        citations = ['Thorne et al. (2026) - J. Subsea Eng.'];
      } else if (lower.includes('sinkage') || lower.includes('clay') || lower.includes('crawler') || lower.includes('bearing')) {
        aiText = `Bekker subsea terramechanics analysis shows abyssal pelagic clay shear strength is extremely low (2.0 to 3.5 kPa). To prevent crawler vehicle sinkage exceeding 15cm, track pad bearing pressure must be maintained strictly under 3.5 kPa using buoyant composite materials.`;
        citations = ['Tanaka et al. (2025) - IEEE Trans. Oceanic Eng.'];
      } else if (lower.includes('plume') || lower.includes('turbidity') || lower.includes('prz') || lower.includes('isa')) {
        aiText = `ISA REMP guidelines mandate that return water discharges occur below the main pycnocline (>2,000m depth) to protect mesopelagic ecosystems. Flocculant injection at the collector exhaust accelerates fine sediment settling time by 75%.`;
        citations = ['Santos et al. (2026) - Ocean & Coastal Management'];
      } else {
        aiText = `Research literature confirms that deep-sea mineral extraction requires balancing multi-phase slurry hydraulics at 400 bar pressure with strict environmental plume containment protocols and real-time acoustic backscatter monitoring.`;
        citations = ['Thorne et al. (2026)', 'Tanaka et al. (2025)'];
      }

      setRdChatHistory((prev) => [
        ...prev,
        { sender: 'AI', text: aiText, citations, timestamp: new Date().toLocaleTimeString() }
      ]);
      setIsRdChatThinking(false);
    }, 1000);
  };

  // Calculator outputs
  const hydrostaticPressureBar = (1025 * 9.81 * simDepthMeters) / 100000;
  const areaSweptPerHourM2 = simMiningSpeedKnots * 1852 * simCrawlerWidthM;
  const harvestRateKgPerHour = areaSweptPerHourM2 * simNoduleDensityKgM2;
  const harvestRateTonsPerDay = (harvestRateKgPerHour * 24) / 1000;
  const dailyGrossValueUSD = harvestRateTonsPerDay * simMetalPricePerTonUSD;

  // Filtered modules & resources
  const filteredModules = modules.filter((m) => {
    const matchesCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !onlyBookmarks || m.isBookmarked;
    return matchesCat && matchesSearch && matchesBookmark;
  });

  const filteredResources = resources.filter((r) => {
    const matchesCat = selectedCategory === 'ALL' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.annotation && r.annotation.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = !onlyBookmarks || r.isBookmarked;
    const matchesAnnotated = !onlyAnnotated || Boolean(r.annotation && r.annotation.trim().length > 0);
    return matchesCat && matchesSearch && matchesBookmark && matchesAnnotated;
  });

  const filteredForumThreads = forumThreads.filter((t) => {
    const matchesCat = forumCategoryFilter === 'ALL' || t.category === forumCategoryFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(forumSearchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredResearchPapers = researchPapers.filter((p) => {
    const matchesCat = paperCategoryFilter === 'ALL' || p.category === paperCategoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(paperSearchQuery.toLowerCase()) ||
      p.abstract.toLowerCase().includes(paperSearchQuery.toLowerCase()) ||
      p.authors.some((a) => a.toLowerCase().includes(paperSearchQuery.toLowerCase())) ||
      p.journalOrConference.toLowerCase().includes(paperSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredJobs = jobs.filter((j) => {
    const matchesCat = jobCategoryFilter === 'ALL' || j.category === jobCategoryFilter;
    const matchesSearch =
      j.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      j.description.toLowerCase().includes(jobSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredInstitutes = institutes.filter((inst) => {
    const matchesRegion = instituteRegionFilter === 'ALL' || inst.region === instituteRegionFilter;
    const matchesDegree =
      instituteDegreeFilter === 'ALL' ||
      inst.programsOffered.some((p) => p.degree.toLowerCase().includes(instituteDegreeFilter.toLowerCase()));
    const matchesSearch =
      inst.name.toLowerCase().includes(instituteSearchQuery.toLowerCase()) ||
      inst.shortName.toLowerCase().includes(instituteSearchQuery.toLowerCase()) ||
      inst.cityState.toLowerCase().includes(instituteSearchQuery.toLowerCase()) ||
      inst.country.toLowerCase().includes(instituteSearchQuery.toLowerCase()) ||
      inst.fullAddress.toLowerCase().includes(instituteSearchQuery.toLowerCase()) ||
      inst.specializedLabsAndFacilities.some((lab) => lab.toLowerCase().includes(instituteSearchQuery.toLowerCase())) ||
      inst.keyResearchAreas.some((res) => res.toLowerCase().includes(instituteSearchQuery.toLowerCase()));
    const matchesBookmark = !onlyBookmarkedInstitutes || inst.isBookmarked;
    return matchesRegion && matchesDegree && matchesSearch && matchesBookmark;
  });

  const handleToggleBookmarkInstitute = (instId: string) => {
    hapticEngine.trigger('click');
    setInstitutes((prev) =>
      prev.map((inst) => (inst.id === instId ? { ...inst, isBookmarked: !inst.isBookmarked } : inst))
    );
  };

  const handleOpenInquiryModal = (inst: OceanMiningInstitute) => {
    hapticEngine.trigger('click');
    setInquiryInstitute(inst);
    setShowInquiryModal(true);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryInstitute) return;
    hapticEngine.trigger('success');

    const newInquiry: InstituteInquiry = {
      id: `inq-${Date.now()}`,
      instituteId: inquiryInstitute.id,
      instituteName: inquiryInstitute.name,
      applicantName: inquiryForm.applicantName,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      country: inquiryForm.country,
      qualification: inquiryForm.qualification,
      programType: inquiryForm.programType,
      inquiryType: inquiryForm.inquiryType,
      message: inquiryForm.message,
      submissionDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    setInquiriesList((prev) => [newInquiry, ...prev]);
    setShowInquiryModal(false);
    setInquiryToast(`Inquiry successfully submitted to ${inquiryInstitute.shortName}! Reference Code: ${newInquiry.id.toUpperCase()}`);
    setInquiryForm({
      applicantName: '',
      email: '',
      phone: '',
      country: 'India',
      qualification: 'B.Tech / B.Sc Graduate',
      programType: 'M.Tech / M.Sc Degrees',
      inquiryType: 'Admissions',
      message: ''
    });
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 font-mono text-white animate-fadeIn pb-12">
      {/* ======================================================== */}
      {/* HEADER & DUAL ONLINE/OFFLINE MODE + QUICK BAR           */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-900 to-slate-950 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Pickaxe className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>OFFSHORE SUBSEA & DEEP-SEA MINERAL EXTRACTION PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white bg-gradient-to-r from-white via-cyan-100 to-amber-300 bg-clip-text text-transparent">
              Ocean Mining & Offshore Engineering Studies Portal
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Comprehensive academic, technical, and regulatory engineering portal covering deep-sea mineral categories, subsea robotics, ISA compliance, offline quizzes, study timer, jobs search, and vessel sync.
            </p>
          </div>

          {/* Dual Online vs Offline Mode Switcher */}
          <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setPortalMode('ONLINE');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                portalMode === 'ONLINE'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>ONLINE PORTAL</span>
            </button>

            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setPortalMode('OFFLINE');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 ${
                portalMode === 'OFFLINE'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <WifiOff className="w-4 h-4 text-amber-950" />
              <span>OFFLINE PORTAL (AT SEA)</span>
            </button>
          </div>
        </div>

        {/* Global Toast Notices */}
        {syncStatusMsg && (
          <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/40 text-xs flex items-center justify-between font-bold animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{syncStatusMsg}</span>
            </div>
            <button onClick={() => setSyncStatusMsg(null)}>
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

        {timerToast && (
          <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/40 text-xs flex items-center justify-between font-bold animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{timerToast}</span>
            </div>
            <button onClick={() => setTimerToast(null)}>
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

        {alertCreatedToast && (
          <div className="p-3 bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-500/40 text-xs flex items-center justify-between font-bold animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>{alertCreatedToast}</span>
            </div>
            <button onClick={() => setAlertCreatedToast(null)}>
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('CURRICULUM');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CURRICULUM'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Curriculum ({modules.length})</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('PROGRESS_TRACKER');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PROGRESS_TRACKER'
                ? 'bg-slate-800 text-emerald-300 border border-emerald-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Progress ({progressPercentage}%)</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('STUDY_TIMER');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'STUDY_TIMER'
                ? 'bg-slate-800 text-amber-300 border border-amber-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Study Timer ({formatTimer(studyTimerSeconds)})</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('OFFLINE_QUIZ_MODE');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'OFFLINE_QUIZ_MODE'
                ? 'bg-slate-800 text-purple-300 border border-purple-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>Offline Quizzes</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('ENGINEERING_DETAILS');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ENGINEERING_DETAILS'
                ? 'bg-slate-800 text-sky-300 border border-sky-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Engineering Deep Dive</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('JOBS_CAREERS');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'JOBS_CAREERS'
                ? 'bg-slate-800 text-amber-300 border border-amber-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Jobs & Careers ({jobs.length})</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('WORLDWIDE_INTEL');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'WORLDWIDE_INTEL'
                ? 'bg-slate-800 text-indigo-300 border border-indigo-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Mining Map</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('RESOURCES_DOWNLOADS');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'RESOURCES_DOWNLOADS'
                ? 'bg-slate-800 text-teal-300 border border-teal-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderDown className="w-4 h-4 text-teal-400" />
            <span>Resources & CAD</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('SYNC_CONTROL');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SYNC_CONTROL'
                ? 'bg-slate-800 text-rose-300 border border-rose-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-rose-400" />
            <span>Offline Sync</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('SIMULATOR');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SIMULATOR'
                ? 'bg-slate-800 text-amber-300 border border-amber-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Simulator</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('PEER_FORUM');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PEER_FORUM'
                ? 'bg-slate-800 text-sky-300 border border-sky-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Peer Forum ({forumThreads.length})</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('GAMIFICATION_BADGES');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'GAMIFICATION_BADGES'
                ? 'bg-slate-800 text-amber-300 border border-amber-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Milestones & XP ({totalUserXp})</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('STUDY_ANALYTICS');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'STUDY_ANALYTICS'
                ? 'bg-slate-800 text-indigo-300 border border-indigo-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('RESEARCH_LIBRARY');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'RESEARCH_LIBRARY'
                ? 'bg-slate-800 text-emerald-300 border border-emerald-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Library className="w-4 h-4 text-emerald-400" />
            <span>R&D Library & AI</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('INSTITUTES_DIRECTORY');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INSTITUTES_DIRECTORY'
                ? 'bg-slate-800 text-teal-300 border border-teal-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Institutes & Universities ({institutes.length})</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('AI_TUTOR');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'AI_TUTOR'
                ? 'bg-slate-800 text-indigo-300 border border-indigo-500/50 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI Tutor</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. TAB: CURRICULUM & SYLLABUS WITH BOOKMARKS             */}
      {/* ======================================================== */}
      {activeTab === 'CURRICULUM' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mining modules by keyword (e.g. 'nodules', 'hydraulics', 'ISA code', '4000m')..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setOnlyBookmarks(!onlyBookmarks);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                    onlyBookmarks
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {onlyBookmarks ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  <span>Bookmarked Only</span>
                </button>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-cyan-300 rounded-xl px-3 py-2 font-bold focus:outline-none"
                >
                  <option value="ALL">ALL CATEGORIES</option>
                  <option value="Polymetallic Nodules (CCZ & Indian Ocean)">Polymetallic Nodules</option>
                  <option value="Seafloor Massive Sulfides (SMS)">Seafloor Massive Sulfides</option>
                  <option value="Cobalt-Rich Ferromanganese Crusts">Cobalt-Rich Crusts</option>
                  <option value="Seabed Heavy Mineral Sands & Rare Earth Muds">Rare Earth Muds</option>
                  <option value="Methane Gas Hydrates (Clathrates)">Methane Gas Hydrates</option>
                  <option value="Subsea Robotics & Hydraulics">Subsea Robotics</option>
                  <option value="Environmental Impact & Plume Modeling">Environmental Plumes</option>
                  <option value="ISA Regulations & UNCLOS Legal Framework">ISA Legal Code</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredModules.map((mod) => (
              <div
                key={mod.id}
                className={`p-5 rounded-2xl bg-slate-900 border space-y-4 flex flex-col justify-between transition-all group shadow-xl ${
                  mod.isCompleted ? 'border-emerald-500/40' : 'border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                          {mod.category}
                        </span>
                        {mod.isCompleted && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 flex items-center space-x-1">
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                        {mod.title}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleBookmarkModule(mod.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          mod.isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                        }`}
                        title={mod.isBookmarked ? 'Remove Bookmark' : 'Bookmark Module'}
                      >
                        {mod.isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 text-[10px] font-bold">
                        {mod.code}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{mod.description}</p>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Core Syllabus Topics:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {mod.topics.map((top, tIdx) => (
                        <li key={tIdx}>{top}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] text-slate-400">
                    {mod.instructor} ({mod.durationHours} hrs)
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleModuleCompletion(mod.id)}
                      className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 transition-all ${
                        mod.isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>{mod.isCompleted ? 'Done' : 'Mark Done'}</span>
                    </button>

                    <button
                      onClick={() => handleStartQuiz(mod)}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 font-bold text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span>Take Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TAB: PROGRESS TRACKER DASHBOARD                        */}
      {/* ======================================================== */}
      {activeTab === 'PROGRESS_TRACKER' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>STUDENT ACADEMIC & COMPETENCY DASHBOARD</span>
              </div>
              <h2 className="text-xl font-black text-white">Subsea Mining Engineering Progress</h2>
            </div>

            <button
              onClick={handleExportStudyProgress}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-black text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/20 shrink-0 self-start md:self-auto transition-all"
            >
              <FileDown className="w-4 h-4 text-slate-950" />
              <span>EXPORT STUDY PROGRESS (JSON TRANSCRIPT)</span>
            </button>
          </div>

          {/* Progress Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Modules Finished</span>
              <div className="text-2xl font-black text-cyan-400">
                {completedModulesCount} / {totalModulesCount}
              </div>
              <p className="text-[10px] text-slate-500">Core engineering subjects completed</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Logged Study Time</span>
              <div className="text-2xl font-black text-amber-400">
                {totalHoursCompleted + Math.floor(totalLoggedStudyMinutes / 60)} hrs
              </div>
              <p className="text-[10px] text-slate-500">Lectures + timer session minutes</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Syllabus Mastery</span>
              <div className="text-2xl font-black text-emerald-400">{progressPercentage}%</div>
              <p className="text-[10px] text-slate-500">Overall qualification score</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Quizzes Passed</span>
              <div className="text-2xl font-black text-purple-400">{quizHistory.length}</div>
              <p className="text-[10px] text-slate-500">Offline exam certifications</p>
            </div>
          </div>

          {/* Main Progress Bar */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Degree Qualification Completion Meter</span>
              <span className="text-cyan-400">{progressPercentage}% Complete</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Syllabus Checklist */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Syllabus Completion Checklist</h3>
            <div className="space-y-2">
              {modules.map((m) => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleToggleModuleCompletion(m.id)}>
                      {m.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-700" />
                      )}
                    </button>
                    <div>
                      <span className="font-bold text-white block">{m.title}</span>
                      <span className="text-[10px] text-slate-400">{m.code} • {m.category}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${m.isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                    {m.isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. TAB: STUDY SESSION TIMER                              */}
      {/* ======================================================== */}
      {activeTab === 'STUDY_TIMER' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl max-w-3xl mx-auto text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>OFFSHORE STUDY SESSION & FOCUS TIMER</span>
            </div>
            <h2 className="text-2xl font-black text-white">Pomodoro & Custom Study Session</h2>
            <p className="text-xs text-slate-400">
              Track focused study minutes. Completed study sessions automatically log into your Progress Profile.
            </p>
          </div>

          {/* Big Timer Circle Display */}
          <div className="p-8 rounded-3xl bg-slate-950 border border-amber-500/30 max-w-md mx-auto space-y-6 shadow-2xl">
            <div className="text-6xl font-black text-amber-300 tracking-wider font-mono">
              {formatTimer(studyTimerSeconds)}
            </div>

            {/* Presets */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleSelectPresetTimer(1500)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  studyTimerPreset === 1500
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                25 Min Focus
              </button>
              <button
                onClick={() => handleSelectPresetTimer(3000)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  studyTimerPreset === 3000
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                50 Min Deep Study
              </button>
              <button
                onClick={() => handleSelectPresetTimer(300)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  studyTimerPreset === 300
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                5 Min Break
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={handleStartPauseStudyTimer}
                className={`px-6 py-3 rounded-2xl font-black text-xs flex items-center space-x-2 transition-all shadow-lg ${
                  isStudyTimerRunning
                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                }`}
              >
                {isStudyTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                <span>{isStudyTimerRunning ? 'PAUSE TIMER' : 'START STUDY TIMER'}</span>
              </button>

              <button
                onClick={handleResetStudyTimer}
                className="px-4 py-3 rounded-2xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <span>Total Logged Extra Study Time: </span>
            <strong className="text-amber-300 font-bold">{totalLoggedStudyMinutes} minutes</strong>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. TAB: OFFLINE QUIZ MODE                                */}
      {/* ======================================================== */}
      {activeTab === 'OFFLINE_QUIZ_MODE' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase">
                <Award className="w-4 h-4 text-purple-400" />
                <span>OFFLINE EXAM & EXERCISES RUNNER</span>
              </div>
              <h2 className="text-xl font-black text-white">{quizModule.title} ({quizModule.code})</h2>
            </div>

            {/* Quiz Module Selector */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs text-slate-400 font-bold">Select Module:</span>
              <select
                value={quizModule.id}
                onChange={(e) => {
                  const found = modules.find((m) => m.id === e.target.value);
                  if (found) handleStartQuiz(found);
                }}
                className="bg-slate-950 border border-slate-800 text-xs text-purple-300 rounded-xl px-3 py-2 font-bold focus:outline-none"
              >
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.code} - {m.title.substring(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quiz Active View */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <span className="text-purple-300 font-bold">
                Question {currentQuestionIndex + 1} of {quizModule.quizQuestions.length}
              </span>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-300">Time Remaining: {formatTimer(quizTimerSeconds)}</span>
              </div>
            </div>

            {/* Current Question */}
            {quizModule.quizQuestions[currentQuestionIndex] && (
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {quizModule.quizQuestions[currentQuestionIndex].question}
                </h3>

                <div className="space-y-2">
                  {quizModule.quizQuestions[currentQuestionIndex].options.map((option, oIdx) => {
                    const isSelected = userQuizAnswers[currentQuestionIndex] === oIdx;
                    const isCorrect = quizModule.quizQuestions[currentQuestionIndex].correctIndex === oIdx;

                    let btnStyle = 'bg-slate-900 text-slate-300 border-slate-800 hover:border-purple-500/50';
                    if (quizSubmitted) {
                      if (isCorrect) btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold';
                      else if (isSelected && !isCorrect) btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-purple-500/20 text-purple-300 border-purple-500 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerQuestion(currentQuestionIndex, oIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Question Explanation if Submitted */}
                {quizSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-purple-400 block">Explanation:</span>
                    <p>{quizModule.quizQuestions[currentQuestionIndex].explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Question Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold disabled:opacity-40"
              >
                Previous
              </button>

              {!quizSubmitted ? (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2 rounded-xl bg-purple-500 text-slate-950 font-black text-xs hover:bg-purple-400 shadow-lg shadow-purple-500/20"
                >
                  Submit Exam
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-400">Exam Grading Complete!</span>
              )}

              <button
                disabled={currentQuestionIndex === quizModule.quizQuestions.length - 1}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>

          {/* Quiz History Log */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Exam Attempt History</h3>
            <div className="space-y-2">
              {quizHistory.map((hist, hIdx) => (
                <div key={hIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{hist.title} ({hist.moduleCode})</span>
                    <span className="text-[10px] text-slate-400">{hist.date}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-bold">
                    {hist.score} / {hist.total} Correct
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TAB: ENGINEERING DEEP DIVE DETAILS                    */}
      {/* ======================================================== */}
      {activeTab === 'ENGINEERING_DETAILS' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>DEEP-SEA MINING ENGINEERING STUDIES TECHNICAL DEEP DIVE</span>
            </div>
            <h2 className="text-xl font-black text-white">Subsea Geotechnics & Fluid Dynamics Blueprint</h2>
          </div>

          {/* Detail Category Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ENGINEERING_STUDY_DETAILS.map((det) => (
              <button
                key={det.id}
                onClick={() => {
                  hapticEngine.trigger('click');
                  setSelectedDetail(det);
                }}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  selectedDetail.id === det.id
                    ? 'bg-slate-950 border-sky-500 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] text-sky-400 font-bold uppercase block">{det.category}</span>
                <h3 className="text-xs font-black text-white">{det.title}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">{det.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Active Engineering Detail Technical Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs text-sky-400 font-bold uppercase">{selectedDetail.category}</span>
              <h3 className="text-xl font-extrabold text-white mt-1">{selectedDetail.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{selectedDetail.subtitle}</p>
            </div>

            {/* Key Formulas */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Governing Engineering Formulas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDetail.keyFormulas.map((form, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white block">{form.name}</span>
                    <div className="p-2.5 rounded bg-slate-950 text-cyan-300 font-mono text-xs font-bold text-center border border-cyan-500/30">
                      {form.formula}
                    </div>
                    <p className="text-[11px] text-slate-400">{form.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-300 uppercase">Subsea Engineering Challenges</h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {selectedDetail.engineeringChallenges.map((c, cIdx) => (
                    <li key={cIdx}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-bold text-emerald-300 uppercase">Engineering Solutions</h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {selectedDetail.solutions.map((s, sIdx) => (
                    <li key={sIdx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Architecture Diagram Flow */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-sky-300 uppercase">Subsea System Architecture Flow</h4>
              <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedDetail.diagramSummary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. TAB: JOBS OPPORTUNITIES SEARCH & ALERT SYSTEM          */}
      {/* ======================================================== */}
      {activeTab === 'JOBS_CAREERS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>OFFSHORE OCEAN MINING & SUBSEA CAREERS PORTAL</span>
                </div>
                <h2 className="text-xl font-black text-white">Global Job Vacancies & Alert Systems</h2>
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowAlertModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 flex items-center space-x-2 shadow-lg shadow-amber-500/20 shrink-0"
              >
                <Bell className="w-4 h-4" />
                <span>Set Up Custom Job Alert</span>
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  placeholder="Search jobs by title, company, or requirement (e.g. 'ROV Pilot', 'Riser Hydraulics', 'ISA Legal')..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={jobCategoryFilter}
                onChange={(e) => setJobCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-amber-300 rounded-xl px-3 py-2 font-bold focus:outline-none shrink-0"
              >
                <option value="ALL">ALL CAREER CATEGORIES</option>
                <option value="ROV Operations">ROV Operations</option>
                <option value="Riser Hydraulics">Riser Hydraulics</option>
                <option value="Subsea Geotechnics">Subsea Geotechnics</option>
                <option value="ISA Regulatory & EIA">ISA Regulatory & EIA</option>
                <option value="Benthic Marine Biology">Benthic Marine Biology</option>
              </select>
            </div>
          </div>

          {/* Active Job Alerts Pill Display */}
          {activeAlerts.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Your Active Job Alerts:</span>
              <div className="flex flex-wrap gap-2">
                {activeAlerts.map((alt) => (
                  <div key={alt.id} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/40 text-xs text-amber-300 font-bold flex items-center space-x-2">
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>"{alt.keyword}" ({alt.freq}) ➔ {alt.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Vacancy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase">{job.category}</span>
                      <h3 className="text-base font-black text-white mt-0.5">{job.title}</h3>
                      <span className="text-xs text-cyan-300 font-bold block">{job.company}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 shrink-0">
                      {job.experienceLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Location/Vessel:</span>
                      <span className="text-slate-300 font-bold">{job.location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Rotation:</span>
                      <span className="text-slate-300 font-bold">{job.rotationType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Salary Range:</span>
                      <span className="text-emerald-400 font-bold">{job.salaryUSD}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Deadline:</span>
                      <span className="text-amber-300 font-bold">{job.applyDeadline}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Key Qualifications:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
                      {job.requirements.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Posted: {job.postedDate}</span>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      setSelectedJobToApply(job);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-black text-xs flex items-center space-x-1.5 transition-all"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Job Application Submission Modal */}
          {selectedJobToApply && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-lg w-full space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">Apply for Opportunity</span>
                    <h3 className="text-base font-black text-white">{selectedJobToApply.title}</h3>
                  </div>
                  <button onClick={() => setSelectedJobToApply(null)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                {applySuccessMsg ? (
                  <div className="p-4 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/40 text-xs font-bold text-center">
                    {applySuccessMsg}
                  </div>
                ) : (
                  <form onSubmit={handleApplyToJob} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Applicant Full Name:</label>
                      <input
                        required
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Capt. Sarah Connor"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Email / Contact:</label>
                      <input
                        required
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="mrajukadugodi@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                      <span>Applying to: </span>
                      <strong className="text-white">{selectedJobToApply.company} ({selectedJobToApply.location})</strong>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedJobToApply(null)}
                        className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Custom Job Alert Setup Modal */}
          {showAlertModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-lg w-full space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                    <Bell className="w-4 h-4" />
                    <span>Create Custom Job Alert</span>
                  </div>
                  <button onClick={() => setShowAlertModal(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <form onSubmit={handleCreateJobAlert} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Keywords / Role Title:</label>
                    <input
                      required
                      type="text"
                      value={alertKeyword}
                      onChange={(e) => setAlertKeyword(e.target.value)}
                      placeholder="e.g. Subsea Riser Engineer, ROV Pilot, ISA Officer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Notification Email:</label>
                    <input
                      required
                      type="email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="mrajukadugodi@gmail.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Alert Frequency:</label>
                    <select
                      value={alertFreq}
                      onChange={(e) => setAlertFreq(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-bold focus:outline-none"
                    >
                      <option value="IMMEDIATE">IMMEDIATE (VSAT Instant Push)</option>
                      <option value="DAILY">DAILY SUMMARY</option>
                      <option value="WEEKLY">WEEKLY DIGEST</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAlertModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400"
                    >
                      Activate Alert
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. TAB: WORLDWIDE INTELLIGENCE MAP                       */}
      {/* ======================================================== */}
      {activeTab === 'WORLDWIDE_INTEL' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>GLOBAL OCEAN MINING RESERVES & ISA CONTRACT MAP</span>
            </div>
            <h2 className="text-xl font-black text-white">Worldwide Subsea Mineral Fields</h2>
          </div>

          {/* Map Zone Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {GLOBAL_MINING_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  hapticEngine.trigger('click');
                  setSelectedZone(zone);
                }}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  selectedZone.id === zone.id
                    ? 'bg-slate-950 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{zone.ocean}</span>
                  <span className="text-[10px] text-indigo-300 font-bold px-2 py-0.5 rounded bg-indigo-500/20">
                    {zone.status}
                  </span>
                </div>
                <h3 className="text-xs font-black text-white">{zone.name}</h3>
                <span className="text-[10px] text-slate-400 block">{zone.depthMeters} depth</span>
              </button>
            ))}
          </div>

          {/* Selected Zone Intelligence Detail Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase">{selectedZone.region}</span>
              <h3 className="text-xl font-black text-white mt-0.5">{selectedZone.name}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedZone.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Primary Mineral Type:</span>
                <span className="text-amber-300 font-bold">{selectedZone.primaryCategory}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Estimated Reserves:</span>
                <span className="text-emerald-300 font-bold">{selectedZone.estimatedReservesMt}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Water Depth:</span>
                <span className="text-cyan-300 font-bold">{selectedZone.depthMeters}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Coordinates:</span>
                <span className="text-indigo-300 font-bold">{selectedZone.lat}°N, {selectedZone.lng}°W</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase block">ISA Exploration Contract Holders:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedZone.isaContractHolders.map((holder, hIdx) => (
                  <span key={hIdx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold">
                    {holder}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
              <strong className="block font-bold">Environmental Buffer & Compliance:</strong>
              <span>{selectedZone.environmentalBuffer}</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. TAB: RESOURCES & CAD DOWNLOADS                        */}
      {/* ======================================================== */}
      {activeTab === 'RESOURCES_DOWNLOADS' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search CAD models, manuals, ISA code PDFs..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setOnlyBookmarks(!onlyBookmarks);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                    onlyBookmarks
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {onlyBookmarks ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  <span>Bookmarked Only</span>
                </button>

                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setOnlyAnnotated(!onlyAnnotated);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                    onlyAnnotated
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-4 h-4 text-teal-400" />
                  <span>Annotated Only</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-teal-400 font-bold uppercase">{res.category}</span>
                      <h3 className="text-sm font-extrabold text-white mt-1">{res.title}</h3>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleBookmarkResource(res.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          res.isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                        }`}
                      >
                        {res.isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-teal-300 text-[10px] font-bold">
                        {res.fileFormat}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{res.description}</p>

                  {/* Resource Annotation Box */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-teal-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-teal-400 uppercase">
                      <div className="flex items-center space-x-1.5">
                        <Edit3 className="w-3 h-3 text-teal-400" />
                        <span>Engineer Technical Annotation</span>
                      </div>
                      {res.annotationDate && <span className="text-slate-500">{res.annotationDate}</span>}
                    </div>

                    {editingAnnotationId === res.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={annotationInput}
                          onChange={(e) => setAnnotationInput(e.target.value)}
                          placeholder="Type technical study notes, calculation references, or deployment reminders..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-400 h-20"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingAnnotationId(null);
                              setAnnotationInput('');
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveResourceAnnotation(res.id)}
                            className="px-3 py-1 rounded bg-teal-500 text-slate-950 text-[10px] font-black hover:bg-teal-400"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[11px] text-teal-200/90 italic font-sans leading-relaxed">
                          {res.annotation ? `"${res.annotation}"` : 'No technical note attached to this resource yet.'}
                        </p>

                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingAnnotationId(res.id);
                              setAnnotationInput(res.annotation || '');
                            }}
                            className="p-1 rounded bg-slate-900 text-teal-400 border border-slate-800 hover:text-white text-[10px] font-bold flex items-center space-x-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{res.annotation ? 'Edit' : 'Add Note'}</span>
                          </button>

                          {res.annotation && (
                            <button
                              onClick={() => handleDeleteResourceAnnotation(res.id)}
                              className="p-1 rounded bg-slate-900 text-rose-400 border border-slate-800 hover:text-rose-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{res.downloadsCount} downloads</span>

                  <button
                    onClick={() => handleToggleDownloadResource(res.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                      res.downloadStatus === 'DOWNLOADED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{res.downloadStatus === 'DOWNLOADED' ? 'Cached' : `${res.fileSizeMb} MB`}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. TAB: OFFLINE SYNC MANAGER CONTROL                     */}
      {/* ======================================================== */}
      {activeTab === 'SYNC_CONTROL' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <span>OFFLINE VESSEL SATELLITE SYNC MANAGER</span>
            </div>
            <h2 className="text-xl font-black text-white">Cache & Connectivity Control</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sync Settings */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Sync Preferences</h3>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <span className="font-bold text-white block">Auto Background Sync</span>
                  <span className="text-[10px] text-slate-400">Sync scores & notes when VSAT is available</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncEnabled}
                  onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                  className="w-4 h-4 accent-rose-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <span className="font-bold text-white block">Auto Download New Releases</span>
                  <span className="text-[10px] text-slate-400">Fetch new ISA regulations automatically</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoDownloadSyllabus}
                  onChange={(e) => setAutoDownloadSyllabus(e.target.checked)}
                  className="w-4 h-4 accent-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Network Priority:</label>
                <select
                  value={syncNetworkPreference}
                  onChange={(e) => setSyncNetworkPreference(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-rose-300 rounded-xl p-2.5 font-bold focus:outline-none"
                >
                  <option value="VSAT_SATELLITE">VSAT Satellite Link Only</option>
                  <option value="WIFI_ONLY">In-Port Wi-Fi Only</option>
                  <option value="ANY">Any Network Connection</option>
                </select>
              </div>

              <button
                disabled={isSyncing}
                onClick={handleTriggerManualSync}
                className="w-full py-3 rounded-xl bg-rose-500 text-slate-950 font-black text-xs hover:bg-rose-400 flex items-center justify-center space-x-2 shadow-lg shadow-rose-500/20 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing with Satellite...' : 'Trigger Manual Satellite Backup'}</span>
              </button>
            </div>

            {/* Storage & Queue */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Local Storage Footprint</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Browser Cache Used:</span>
                  <span className="text-rose-400">{storageUsedMb} MB / 8000 MB</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(storageUsedMb / 8000) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Selective Cache Cleanup:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleClearCache('Video Lectures')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-bold hover:text-white"
                  >
                    Clear Videos
                  </button>
                  <button
                    onClick={() => handleClearCache('3D CAD Files')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-bold hover:text-white"
                  >
                    Clear CAD
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending Sync Queue:</span>
                {pendingSyncItems.length > 0 ? (
                  <ul className="list-disc list-inside text-[10px] text-amber-300 space-y-1">
                    {pendingSyncItems.map((item, iIdx) => (
                      <li key={iIdx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-[10px] text-emerald-400 font-bold">Queue Empty - Everything Synced!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 10. TAB: SUBSEA CAD SIMULATOR                            */}
      {/* ======================================================== */}
      {activeTab === 'SIMULATOR' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>SUBSEA CAD PRODUCTION & HARVESTING SIMULATOR</span>
            </div>
            <h2 className="text-xl font-black text-white">Nodule Production & Riser Power Calculator</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Field Parameters</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Water Depth:</span>
                  <span className="text-cyan-400">{simDepthMeters} meters</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="100"
                  value={simDepthMeters}
                  onChange={(e) => setSimDepthMeters(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Nodule Abundance Density:</span>
                  <span className="text-amber-400">{simNoduleDensityKgM2} kg/m²</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={simNoduleDensityKgM2}
                  onChange={(e) => setSimNoduleDensityKgM2(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Collector Track Speed:</span>
                  <span className="text-emerald-400">{simMiningSpeedKnots} knots</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={simMiningSpeedKnots}
                  onChange={(e) => setSimMiningSpeedKnots(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Crawler Pickup Width:</span>
                  <span className="text-purple-400">{simCrawlerWidthM} meters</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  step="1"
                  value={simCrawlerWidthM}
                  onChange={(e) => setSimCrawlerWidthM(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Engineered Outputs</h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Hydrostatic Pressure:</span>
                  <span className="text-cyan-400 font-bold text-base">{hydrostaticPressureBar.toFixed(1)} bar</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Area Swept / Hour:</span>
                  <span className="text-purple-400 font-bold text-base">{areaSweptPerHourM2.toLocaleString()} m²/hr</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Harvest Rate / Day:</span>
                  <span className="text-amber-400 font-bold text-base">{harvestRateTonsPerDay.toFixed(1)} MT/day</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Est. Gross Daily Value:</span>
                  <span className="text-emerald-400 font-bold text-base">${(dailyGrossValueUSD / 1000).toFixed(1)}K USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 11. TAB: AI TUTOR INTERACTIVE BOT                        */}
      {/* ======================================================== */}
      {activeTab === 'AI_TUTOR' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 space-y-1">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>AI OCEAN MINING & SUBSEA GEOTECHNICS TUTOR</span>
            </div>
            <h2 className="text-xl font-black text-white">24/7 Subsea Engineering Q&A</h2>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 h-96 overflow-y-auto space-y-3 font-sans text-xs">
            {tutorChatHistory.map((msg, mIdx) => (
              <div
                key={mIdx}
                className={`p-3 rounded-2xl max-w-2xl ${
                  msg.sender === 'USER'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 ml-auto'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 mr-auto'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-1">
                  <span>{msg.sender === 'USER' ? 'Student' : 'AI Tutor'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            ))}
            {isTutorThinking && (
              <div className="p-3 bg-slate-900 text-indigo-300 rounded-2xl border border-slate-800 text-xs animate-pulse">
                Analyzing subsea geotechnics and ISA regulations...
              </div>
            )}
          </div>

          <form onSubmit={handleAskAITutor} className="flex gap-2">
            <input
              type="text"
              value={tutorQuery}
              onChange={(e) => setTutorQuery(e.target.value)}
              placeholder="Ask a technical question (e.g. 'What is Durand critical velocity in 4000m riser pipes?')..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-500 text-slate-950 font-black text-xs hover:bg-indigo-400 shadow-lg shadow-indigo-500/20"
            >
              Ask Tutor
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* 12. TAB: PEER DISCUSSION FORUMS                          */}
      {/* ======================================================== */}
      {activeTab === 'PEER_FORUM' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>OFFSHORE SUBSEA ENGINEERS PEER FORUM</span>
                </div>
                <h2 className="text-xl font-black text-white">Technical Discussion & Field Exchange</h2>
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowNewThreadModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-black text-xs hover:bg-sky-400 flex items-center space-x-2 shadow-lg shadow-sky-500/20 shrink-0 self-start md:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>New Discussion Thread</span>
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={forumSearchQuery}
                  onChange={(e) => setForumSearchQuery(e.target.value)}
                  placeholder="Search forum threads by title, author, or tag..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <select
                value={forumCategoryFilter}
                onChange={(e) => setForumCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-sky-300 rounded-xl px-3 py-2 font-bold focus:outline-none shrink-0"
              >
                <option value="ALL">ALL TOPICS</option>
                <option value="Riser Hydraulics & Slurry Transport">Riser Hydraulics</option>
                <option value="ISA Compliance & Environmental Plumes">ISA Regulations</option>
                <option value="Abyssal Geotechnics & Crawler Traction">Abyssal Geotechnics</option>
              </select>
            </div>
          </div>

          {/* Forum Thread View vs List */}
          {selectedThread ? (
            /* Detailed Thread View */
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <button
                  onClick={() => setSelectedThread(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 text-sky-400" />
                  <span>Back to Forum Threads</span>
                </button>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40">
                    {selectedThread.category}
                  </span>
                </div>
              </div>

              {/* Original Post */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{selectedThread.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                      <span className="text-sky-300 font-bold">{selectedThread.author}</span>
                      <span>•</span>
                      <span>{selectedThread.role}</span>
                      <span>•</span>
                      <span>{selectedThread.vesselOrInstitution}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500">{selectedThread.postedDate}</span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-sans">{selectedThread.content}</p>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedThread.tags.map((tg, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                        #{tg}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLikeThread(selectedThread.id)}
                    className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 font-bold text-xs flex items-center space-x-1.5"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedThread.likes} Likes</span>
                  </button>
                </div>
              </div>

              {/* Replies Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Replies ({selectedThread.replies.length})
                </h4>

                <div className="space-y-3">
                  {selectedThread.replies.map((rep) => (
                    <div key={rep.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                        <div>
                          <span className="text-sky-300 font-bold">{rep.author}</span>
                          <span className="text-slate-500 text-[10px] ml-2">({rep.role} - {rep.vesselOrInstitution})</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{rep.postedDate}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{rep.content}</p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleLikeReply(selectedThread.id, rep.id)}
                          className="text-[10px] text-slate-400 hover:text-sky-300 flex items-center space-x-1"
                        >
                          <ThumbsUp className="w-3 h-3 text-sky-400" />
                          <span>{rep.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Reply Form */}
                <form onSubmit={handlePostReply} className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <h5 className="text-xs font-bold text-white uppercase">Post Engineer Reply:</h5>
                  <textarea
                    required
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Provide technical insights, formulas, or operational experiences..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-500 h-24 font-sans"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-sky-500 text-slate-950 font-black text-xs hover:bg-sky-400 flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Reply</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Thread List View */
            <div className="space-y-4">
              {filteredForumThreads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setSelectedThread(thread);
                  }}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all cursor-pointer space-y-3 shadow-xl group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold text-[10px] border border-sky-500/40">
                        {thread.category}
                      </span>
                      {thread.isPinned && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                          PINNED
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">{thread.postedDate}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    {thread.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">{thread.content}</p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] text-slate-300 font-bold">{thread.author} ({thread.vesselOrInstitution})</span>

                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="w-3.5 h-3.5 text-sky-400" />
                        <span>{thread.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                        <span>{thread.repliesCount} replies</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Discussion Thread Modal */}
          {showNewThreadModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-xl w-full space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
                    <MessageSquare className="w-4 h-4" />
                    <span>Create Discussion Thread</span>
                  </div>
                  <button onClick={() => setShowNewThreadModal(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <form onSubmit={handleCreateThread} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Thread Category:</label>
                    <select
                      value={newThreadCategory}
                      onChange={(e) => setNewThreadCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sky-300 font-bold focus:outline-none"
                    >
                      <option value="Riser Hydraulics & Slurry Transport">Riser Hydraulics & Slurry Transport</option>
                      <option value="ISA Compliance & Environmental Plumes">ISA Compliance & Environmental Plumes</option>
                      <option value="Abyssal Geotechnics & Crawler Traction">Abyssal Geotechnics & Crawler Traction</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Thread Title:</label>
                    <input
                      required
                      type="text"
                      value={newThreadTitle}
                      onChange={(e) => setNewThreadTitle(e.target.value)}
                      placeholder="e.g. Pump pressure compensation during heave motion at 4000m"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Technical Post Content:</label>
                    <textarea
                      required
                      value={newThreadContent}
                      onChange={(e) => setNewThreadContent(e.target.value)}
                      placeholder="Detail your operational observations, field parameters, or subsea engineering questions..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-sky-500 h-28 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Tags (comma-separated):</label>
                    <input
                      type="text"
                      value={newThreadTags}
                      onChange={(e) => setNewThreadTags(e.target.value)}
                      placeholder="e.g. Riser, Slurry Flow, CCZ"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewThreadModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-sky-500 text-slate-950 font-black hover:bg-sky-400"
                    >
                      Publish Thread
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 13. TAB: GAMIFICATION MILESTONES & XP SYSTEM             */}
      {/* ======================================================== */}
      {activeTab === 'GAMIFICATION_BADGES' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-950/40 via-slate-900 to-slate-950">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>GAMIFIED ENGINEERING LEARNING MILESTONES</span>
                </div>
                <h2 className="text-2xl font-black text-white">{userRankTitle}</h2>
                <p className="text-xs text-slate-300">
                  Earn XP by completing study modules, taking offline quizzes, logging study timer sessions, and exploring deep-sea mining whitepapers.
                </p>
              </div>

              {/* XP Rank Badge */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 flex items-center space-x-4 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Earned XP</span>
                  <span className="text-2xl font-black text-amber-400">{totalUserXp} XP</span>
                </div>
              </div>
            </div>

            {claimedRewardToast && (
              <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/40 text-xs flex items-center justify-between font-bold animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{claimedRewardToast}</span>
                </div>
                <button onClick={() => setClaimedRewardToast(null)}>
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            )}

            {/* Level Rank Meter */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Next Engineering Rank: Chief Deep-Sea Lead (2500 XP)</span>
                <span className="text-amber-400">{Math.min(100, Math.round((totalUserXp / 2500) * 100))}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalUserXp / 2500) * 100)}%` }}
                />
              </div>
            </div>

            {/* Milestones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {milestones.map((ms) => (
                <div
                  key={ms.id}
                  className={`p-5 rounded-2xl bg-slate-950 border space-y-4 flex flex-col justify-between shadow-xl transition-all ${
                    ms.unlocked ? 'border-amber-500/40 bg-slate-900/80' : 'border-slate-800 opacity-80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            ms.unlocked
                              ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                              : 'bg-slate-900 border border-slate-800 text-slate-500'
                          }`}
                        >
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-amber-400 font-bold uppercase block">{ms.category}</span>
                          <h3 className="text-sm font-extrabold text-white mt-0.5">{ms.title}</h3>
                        </div>
                      </div>

                      <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black">
                        +{ms.xpReward} XP
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{ms.description}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>Milestone Progress:</span>
                        <span>
                          {ms.progressCurrent} / {ms.progressTarget}
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (ms.progressCurrent / ms.progressTarget) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    {ms.unlocked ? (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Unlocked ({ms.unlockedDate})</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaimMilestone(ms.id)}
                        className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-black text-xs shadow"
                      >
                        Unlock Milestone Reward
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 14. TAB: STUDY SESSION ANALYTICS                          */}
      {/* ======================================================== */}
      {activeTab === 'STUDY_ANALYTICS' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>STUDY SESSION TIME & ACCURACY ANALYTICS</span>
            </div>
            <h2 className="text-xl font-black text-white">Offshore Learning Performance Metrics</h2>
          </div>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Weekly Active Hours</span>
              <div className="text-2xl font-black text-indigo-400">30.2 hrs</div>
              <p className="text-[10px] text-emerald-400 font-bold">+18% vs last offshore week</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Quiz Accuracy Rate</span>
              <div className="text-2xl font-black text-emerald-400">94.5%</div>
              <p className="text-[10px] text-slate-500">Based on {quizHistory.length} quiz attempts</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Daily Streak</span>
              <div className="text-2xl font-black text-amber-400 flex items-center space-x-2">
                <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
                <span>5 Days</span>
              </div>
              <p className="text-[10px] text-slate-500">Daily study timer activity</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">CAD & Manual Downloads</span>
              <div className="text-2xl font-black text-teal-400">{resources.filter((r) => r.downloadStatus === 'DOWNLOADED').length} Files</div>
              <p className="text-[10px] text-slate-500">Cached for vessel offline access</p>
            </div>
          </div>

          {/* Weekly Study Hours Bar Chart */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Weekly Study Hours Distribution (Mon - Sun)</h3>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-4">
              {[
                { day: 'Mon', hours: 2.5, percent: 40 },
                { day: 'Tue', hours: 4.0, percent: 65 },
                { day: 'Wed', hours: 3.2, percent: 52 },
                { day: 'Thu', hours: 5.5, percent: 90 },
                { day: 'Fri', hours: 4.2, percent: 68 },
                { day: 'Sat', hours: 6.0, percent: 100 },
                { day: 'Sun', hours: 4.8, percent: 78 }
              ].map((d, dIdx) => (
                <div key={dIdx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-indigo-300 font-bold group-hover:text-amber-300">{d.hours}h</span>
                  <div className="w-full bg-slate-900 rounded-t-lg border border-slate-800 h-32 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t group-hover:from-amber-500 group-hover:to-yellow-300 transition-all duration-300"
                      style={{ height: `${d.percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Category Time Allocation Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Subject Category Time Distribution</h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-cyan-300">4,000m Riser Hydraulics & Slurry Flow</span>
                  <span className="text-cyan-400">35% (10.5 hrs)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '35%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-300">Abyssal Geotechnics & Crawler Traction</span>
                  <span className="text-emerald-400">25% (7.5 hrs)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-amber-300">ISA Mining Regulations & UNCLOS Law</span>
                  <span className="text-amber-400">20% (6.0 hrs)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-purple-300">Subsea Mechatronics & Collector CAD</span>
                  <span className="text-purple-400">20% (6.0 hrs)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 15. TAB: R&D LIBRARY WITH AI CHATBOT                    */}
      {/* ======================================================== */}
      {activeTab === 'RESEARCH_LIBRARY' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                  <Library className="w-4 h-4 text-emerald-400" />
                  <span>SCIENTIFIC R&D LIBRARY & CITATION CHATBOT</span>
                </div>
                <h2 className="text-xl font-black text-white">Peer-Reviewed Papers & ISA Studies</h2>
              </div>
            </div>

            {/* Paper Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={paperSearchQuery}
                  onChange={(e) => setPaperSearchQuery(e.target.value)}
                  placeholder="Search papers by title, author, journal, or equation (e.g. 'Durand', 'Bekker', 'CFD')..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={paperCategoryFilter}
                onChange={(e) => setPaperCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-emerald-300 rounded-xl px-3 py-2 font-bold focus:outline-none shrink-0"
              >
                <option value="ALL">ALL R&D SUBJECTS</option>
                <option value="Riser Hydraulics">Riser Hydraulics</option>
                <option value="Abyssal Geotechnics">Abyssal Geotechnics</option>
                <option value="ISA Compliance">ISA Compliance</option>
              </select>
            </div>
          </div>

          {/* Research Paper Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredResearchPapers.map((paper) => (
              <div
                key={paper.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{paper.category}</span>

                    <button
                      onClick={() => handleToggleBookmarkPaper(paper.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        paper.isBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                      }`}
                    >
                      {paper.isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-sm font-extrabold text-white leading-snug">{paper.title}</h3>

                  <div className="text-[11px] text-slate-400 space-y-0.5">
                    <p className="font-bold text-slate-300">{paper.authors.join(', ')}</p>
                    <p className="text-emerald-300">{paper.journalOrConference}</p>
                    <p className="text-[10px] text-slate-500">DOI: {paper.doi} • {paper.citationCount} Citations</p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">{paper.abstract}</p>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Key Scientific Findings:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-sans">
                      {paper.keyFindings.map((kf, kIdx) => (
                        <li key={kIdx}>{kf}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 hover:text-white font-bold text-xs"
                  >
                    Read Full Paper
                  </button>

                  <span className="text-[10px] text-slate-500 font-bold">{paper.publishYear}</span>
                </div>
              </div>
            ))}
          </div>

          {/* R&D Library Embedded AI Chatbot */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>R&D SCIENTIFIC LITERATURE AI ASSISTANT</span>
              </div>

              <span className="text-[10px] text-slate-400">Grounded in 3 Deep-Sea Research Papers</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 h-80 overflow-y-auto space-y-3 font-sans text-xs">
              {rdChatHistory.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`p-3.5 rounded-2xl max-w-2xl ${
                    msg.sender === 'USER'
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 ml-auto'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 mr-auto'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-1">
                    <span>{msg.sender === 'USER' ? 'Researcher' : 'R&D AI Scholar'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap gap-1 font-mono text-[10px]">
                      <span className="text-slate-500 font-bold">Citations:</span>
                      {msg.citations.map((c, cIdx) => (
                        <span key={cIdx} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          [{c}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isRdChatThinking && (
                <div className="p-3 bg-slate-900 text-emerald-300 rounded-2xl border border-slate-800 text-xs animate-pulse">
                  Searching R&D literature and verifying CFD equations...
                </div>
              )}
            </div>

            <form onSubmit={handleAskRdChatbot} className="flex gap-2">
              <input
                type="text"
                value={rdChatQuery}
                onChange={(e) => setRdChatQuery(e.target.value)}
                placeholder="Ask R&D AI to cite papers or explain formulas (e.g. 'What is the Durand settling velocity for 4000m risers?')..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                Query R&D AI
              </button>
            </form>
          </div>

          {/* Full Paper Reading Modal */}
          {selectedPaper && (
            <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-emerald-400 font-bold uppercase">{selectedPaper.category}</span>
                    <h3 className="text-lg font-extrabold text-white mt-0.5">{selectedPaper.title}</h3>
                  </div>
                  <button onClick={() => setSelectedPaper(null)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <div className="text-xs text-slate-400 space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                  <p><strong>Authors:</strong> {selectedPaper.authors.join(', ')}</p>
                  <p><strong>Institution:</strong> {selectedPaper.institution}</p>
                  <p><strong>Journal:</strong> {selectedPaper.journalOrConference}</p>
                  <p><strong>DOI:</strong> {selectedPaper.doi}</p>
                </div>

                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase">Scientific Article Text:</h4>
                  <pre className="text-xs text-slate-200 bg-slate-950 p-4 rounded-2xl border border-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedPaper.fullText}
                  </pre>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-5 py-2 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 font-bold text-xs"
                  >
                    Close Document
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 16. TAB: INSTITUTES & UNIVERSITIES DIRECTORY & INQUIRY    */}
      {/* ======================================================== */}
      {activeTab === 'INSTITUTES_DIRECTORY' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Toast Alert */}
          {inquiryToast && (
            <div className="p-4 bg-emerald-500/20 text-emerald-300 rounded-2xl border border-emerald-500/40 text-xs flex items-center justify-between font-bold shadow-xl animate-fadeIn">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{inquiryToast}</span>
              </div>
              <button onClick={() => setInquiryToast(null)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>
          )}

          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-950/40 via-slate-900 to-slate-950">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-5 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase">
                  <School className="w-4 h-4 text-teal-400" />
                  <span>GLOBAL ACADEMIC & RESEARCH DIRECTORY</span>
                </div>
                <h2 className="text-2xl font-black text-white">Ocean Mining Studies Institutes & Universities</h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Comprehensive directory of premier universities, research labs, and ISA co-sponsoring academic centers across India and worldwide. Explore full postal addresses, specialized hyperbaric testing facilities, wave towing tanks, and submit direct admissions or research inquiries.
                </p>
              </div>

              {/* Quick Stat Counter Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Centers</span>
                  <span className="text-xl font-black text-white">{institutes.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-amber-500/40 text-center">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">India Institutes</span>
                  <span className="text-xl font-black text-amber-300">{institutes.filter((i) => i.country === 'India').length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-teal-500/40 text-center">
                  <span className="text-[10px] text-teal-400 font-bold uppercase block">Global Universities</span>
                  <span className="text-xl font-black text-teal-300">{institutes.filter((i) => i.country !== 'India').length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-indigo-500/40 text-center">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase block">ISA Co-Sponsors</span>
                  <span className="text-xl font-black text-indigo-300">{institutes.filter((i) => i.isaPartnershipStatus === 'ISA Training Co-Sponsor').length}</span>
                </div>
              </div>
            </div>

            {/* View Mode Switcher & Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-xs font-bold text-slate-400 mr-2 flex items-center space-x-1 shrink-0">
                  <Map className="w-3.5 h-3.5 text-teal-400" />
                  <span>Display Mode:</span>
                </span>

                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setInstituteViewMode('split');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 shrink-0 ${
                    instituteViewMode === 'split'
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Split Map & Cards</span>
                </button>

                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setInstituteViewMode('map');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 shrink-0 ${
                    instituteViewMode === 'map'
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Full Interactive Map</span>
                </button>

                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setInstituteViewMode('grid');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 shrink-0 ${
                    instituteViewMode === 'grid'
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Grid Cards View</span>
                </button>
              </div>

              {/* Bookmarked Filter Pill */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setOnlyBookmarkedInstitutes(!onlyBookmarkedInstitutes);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                    onlyBookmarkedInstitutes
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-amber-300 border-amber-500/40 hover:bg-slate-800'
                  }`}
                >
                  {onlyBookmarkedInstitutes ? <BookmarkCheck className="w-4 h-4 text-slate-950" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
                  <span>Bookmarked Institutes ({institutes.filter((i) => i.isBookmarked).length})</span>
                </button>
              </div>
            </div>

            {/* Region Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400 mr-2 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span>Filter Region:</span>
              </span>
              {[
                { label: 'ALL REGIONS', value: 'ALL' },
                { label: '🇮🇳 INDIA ONLY (NIOT, IITs, NIO)', value: 'India' },
                { label: '🇪🇺 EUROPE (TU Delft, NTNU, GEOMAR)', value: 'Europe' },
                { label: '🇺🇸 NORTH AMERICA (Colorado Mines, Texas A&M)', value: 'North America' },
                { label: '🌏 ASIA-PACIFIC (UTokyo, NUS)', value: 'Asia-Pacific' }
              ].map((rf) => (
                <button
                  key={rf.value}
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setInstituteRegionFilter(rf.value);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    instituteRegionFilter === rf.value
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Search & Degree Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={instituteSearchQuery}
                  onChange={(e) => setInstituteSearchQuery(e.target.value)}
                  placeholder="Search by institute name, city, address, lab facility, or research topic (e.g. 'NIOT', 'Chennai', 'IIT Madras', 'Delft', 'Hyperbaric')..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <select
                  value={instituteDegreeFilter}
                  onChange={(e) => setInstituteDegreeFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-teal-300 rounded-xl px-3 py-2.5 font-bold focus:outline-none"
                >
                  <option value="ALL">ALL DEGREE PROGRAMS</option>
                  <option value="M.Tech">M.Tech / M.Sc Degrees</option>
                  <option value="Ph.D">Ph.D. / Post-Doc Fellowships</option>
                  <option value="B.Tech">B.Tech / B.Sc Degrees</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Global Map Component */}
          {(instituteViewMode === 'map' || instituteViewMode === 'split') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span>VISUALIZE GLOBAL INSTITUTES & UNIVERSITIES MAP</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Showing {filteredInstitutes.length} locations on map
                </span>
              </div>

              <GlobalInstitutesMap
                institutes={institutes}
                onToggleBookmark={handleToggleBookmarkInstitute}
                onOpenInquiry={handleOpenInquiryModal}
                onSelectDetails={setSelectedInstitute}
                searchQuery={instituteSearchQuery}
                setSearchQuery={setInstituteSearchQuery}
                regionFilter={instituteRegionFilter}
                setRegionFilter={setInstituteRegionFilter}
                onlyBookmarked={onlyBookmarkedInstitutes}
                setOnlyBookmarked={setOnlyBookmarkedInstitutes}
              />
            </div>
          )}

          {/* Institutes Cards Grid */}
          {(instituteViewMode === 'grid' || instituteViewMode === 'split') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1 pt-2">
                <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase">
                  <Building2 className="w-4 h-4 text-teal-400" />
                  <span>INSTITUTES DIRECTORY CARDS ({filteredInstitutes.length})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInstitutes.map((inst) => (
              <div
                key={inst.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl group"
              >
                <div className="space-y-3">
                  {/* Card Header Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-extrabold text-[10px] border border-teal-500/40 uppercase">
                        {inst.region}
                      </span>
                      {inst.country === 'India' && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px] border border-amber-500/40">
                          🇮🇳 INDIA
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-bold text-[10px] border border-slate-800">
                        Estd. {inst.establishedYear}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleBookmarkInstitute(inst.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        inst.isBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                      }`}
                    >
                      {inst.isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Institute Name */}
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-teal-300 transition-colors leading-snug">
                      {inst.name}
                    </h3>
                    <p className="text-[11px] text-teal-400 font-bold mt-0.5">{inst.rankingOrReputation}</p>
                  </div>

                  {/* Postal Address Block */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs text-amber-300 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{inst.cityState}, {inst.country}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{inst.fullAddress}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                      <span>Postal Code: {inst.postalCode}</span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inst.fullAddress)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-400 hover:underline flex items-center space-x-1 font-bold"
                      >
                        <Map className="w-3 h-3 text-teal-400" />
                        <span>Google Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* ISA & Accreditation Status */}
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p className="text-slate-300 font-sans leading-tight"><strong className="text-slate-400">Accreditation:</strong> {inst.accreditation}</p>
                    <div className="flex items-center space-x-1.5 text-indigo-300 font-bold pt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{inst.isaPartnershipStatus}</span>
                    </div>
                  </div>

                  {/* Specialized Labs & Facilities */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Specialized Labs & Facilities:</span>
                    <ul className="space-y-1 text-[11px] text-slate-300 font-sans">
                      {inst.specializedLabsAndFacilities.slice(0, 3).map((lab, lIdx) => (
                        <li key={lIdx} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                          <span>{lab}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Offerd Degrees */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Degree Programs:</span>
                    <div className="flex flex-wrap gap-1">
                      {inst.programsOffered.map((prog, pIdx) => (
                        <span key={pIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-bold text-teal-300">
                          {prog.degree}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      setSelectedInstitute(inst);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 text-teal-300 border border-slate-800 hover:text-white font-bold text-xs flex items-center space-x-1"
                  >
                    <Building2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => handleOpenInquiryModal(inst)}
                    className="px-3 py-1.5 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 font-black text-xs flex items-center space-x-1.5 shadow"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-950" />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

          {/* Sent Inquiries Log Section */}
          {inquiriesList.length > 0 && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase">
                  <Mail className="w-4 h-4 text-teal-400" />
                  <span>YOUR ACTIVE UNIVERSITY INQUIRIES & APPLICATIONS ({inquiriesList.length})</span>
                </div>
                <span className="text-[10px] text-slate-400">Tracked Admissions Ref Codes</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {inquiriesList.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="font-extrabold text-teal-300">{inq.instituteName}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                        SUBMITTED
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-0.5 font-mono">
                      <p><strong>Applicant:</strong> {inq.applicantName} ({inq.country})</p>
                      <p><strong>Ref Code:</strong> {inq.id.toUpperCase()}</p>
                      <p><strong>Inquiry Type:</strong> {inq.inquiryType} - {inq.programType}</p>
                      <p><strong>Submitted Date:</strong> {inq.submissionDate}</p>
                    </div>

                    <p className="text-[11px] text-slate-300 italic bg-slate-900 p-2 rounded-lg border border-slate-800">
                      "{inq.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Institute View Modal */}
          {selectedInstitute && (
            <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase">
                      <GraduationCap className="w-4 h-4 text-teal-400" />
                      <span>{selectedInstitute.region} • {selectedInstitute.country}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mt-0.5">{selectedInstitute.name}</h3>
                  </div>
                  <button onClick={() => setSelectedInstitute(null)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                {/* Postal Address & Contact Info Box */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-sans text-xs">
                  <h4 className="font-extrabold text-teal-300 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Official Campus Address & Contact Office</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                    <div>
                      <p className="font-bold text-white">{selectedInstitute.cityState}, {selectedInstitute.country}</p>
                      <p className="text-slate-400 mt-1 leading-relaxed">{selectedInstitute.fullAddress}</p>
                      <p className="text-slate-500 text-[10px] mt-1 font-mono">Postal Code: {selectedInstitute.postalCode}</p>
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px] border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-3">
                      <p className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="text-teal-300">{selectedInstitute.contactEmail}</span>
                      </p>
                      <p className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{selectedInstitute.contactPhone}</span>
                      </p>
                      <p className="flex items-center space-x-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <a href={selectedInstitute.website} target="_blank" rel="noreferrer" className="text-sky-300 hover:underline flex items-center space-x-1">
                          <span>{selectedInstitute.website}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Institute Overview */}
                <div className="space-y-2 font-sans">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Institute Background & Legacy:</h4>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    {selectedInstitute.description}
                  </p>
                </div>

                {/* Degree Programs Offered */}
                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Academic Degree Programs & Fellowships:</h4>
                  <div className="space-y-2">
                    {selectedInstitute.programsOffered.map((prog, pIdx) => (
                      <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-extrabold text-[10px] border border-teal-500/40">
                              {prog.degree}
                            </span>
                            <span className="font-extrabold text-white">{prog.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{prog.duration} • {prog.mode}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">{prog.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialized Facilities */}
                <div className="space-y-2 font-sans">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Specialized Ocean Engineering Facilities:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    {selectedInstitute.specializedLabsAndFacilities.map((lab, lIdx) => (
                      <li key={lIdx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{lab}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Modal Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedInstitute(null)}
                    className="px-4 py-2 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 font-bold text-xs"
                  >
                    Close Window
                  </button>

                  <button
                    onClick={() => {
                      setSelectedInstitute(null);
                      handleOpenInquiryModal(selectedInstitute);
                    }}
                    className="px-5 py-2 rounded-xl bg-teal-500 text-slate-950 font-black text-xs hover:bg-teal-400 flex items-center space-x-1.5 shadow"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Inquire for Admissions</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admissions / Research Service Inquiry Modal */}
          {showInquiryModal && inquiryInstitute && (
            <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-xl w-full space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-teal-400 font-bold uppercase">Admissions & Research Service Request</span>
                    <h3 className="text-lg font-black text-white mt-0.5">{inquiryInstitute.shortName}</h3>
                  </div>
                  <button onClick={() => setShowInquiryModal(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Applicant Full Name:</label>
                      <input
                        required
                        type="text"
                        value={inquiryForm.applicantName}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, applicantName: e.target.value })}
                        placeholder="e.g. Rahul Sharma / Dr. Sarah Jenkins"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Email Address:</label>
                      <input
                        required
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="e.g. applicant@domain.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Phone / WhatsApp Number:</label>
                      <input
                        required
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Country of Residence:</label>
                      <input
                        required
                        type="text"
                        value={inquiryForm.country}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, country: e.target.value })}
                        placeholder="India / Netherlands / USA"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Current Qualification:</label>
                      <select
                        value={inquiryForm.qualification}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, qualification: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-teal-300 font-bold focus:outline-none"
                      >
                        <option value="B.Tech / B.E Graduate">B.Tech / B.E Engineering Graduate</option>
                        <option value="M.Tech / M.Sc Graduate">M.Tech / M.Sc Master Degree</option>
                        <option value="Ph.D. Scholar">Ph.D. Research Scholar</option>
                        <option value="Industry Professional">Industry / Offshore Engineer</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-bold block">Service Inquiry Type:</label>
                      <select
                        value={inquiryForm.inquiryType}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, inquiryType: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-teal-300 font-bold focus:outline-none"
                      >
                        <option value="Admissions">Degree Program Admissions</option>
                        <option value="Research Collaboration">Research & Lab Collaboration</option>
                        <option value="ISA Fellowship">ISA Training Fellowship</option>
                        <option value="Campus Visit">Campus & Hyperbaric Lab Visit</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Inquiry Details & Academic Interest:</label>
                    <textarea
                      required
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Specify your technical specialization, target academic intake, or research project interest (e.g., 'Inquiring for M.Tech in Ocean Engineering with research focus on 6,000m subsea nodule crawler robotics')..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 h-28"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowInquiryModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 border border-slate-800 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-teal-500 text-slate-950 font-black hover:bg-teal-400 shadow flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Official Inquiry</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
