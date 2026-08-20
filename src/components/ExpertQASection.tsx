import React, { useState } from 'react';
import { 
  UserCheck, CheckCircle2, MessageSquare, Sparkles, Send, Award, 
  HelpCircle, Star, ShieldCheck, ChevronRight, ThumbsUp, Filter, Search 
} from 'lucide-react';

export interface VerifiedExpert {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatarColor: string;
  specialties: string[];
  answersCount: number;
  rating: number;
}

export interface ExpertQuestionItem {
  id: string;
  title: string;
  questionBody: string;
  authorName: string;
  targetExpertId: string;
  targetExpertName: string;
  category: string;
  status: 'ANSWERED' | 'PENDING';
  timestamp: string;
  upvotes: number;
  expertAnswer?: {
    expertName: string;
    expertRole: string;
    answerText: string;
    timestamp: string;
    isVerifiedSolution: boolean;
    upvotes: number;
  };
}

export const INITIAL_VERIFIED_EXPERTS: VerifiedExpert[] = [
  {
    id: 'EXP-001',
    name: 'Dr. Aris Thorne',
    role: 'Chief Oceanographer',
    institution: 'UN Marine Climate Initiative & NIO',
    avatarColor: 'bg-emerald-500',
    specialties: ['SST Anomalies', 'Blue Carbon', 'Coral Refugia'],
    answersCount: 142,
    rating: 4.95
  },
  {
    id: 'EXP-002',
    name: 'Lt. Cmdr. Sarah Perera',
    role: 'Marine Compliance Auditor',
    institution: 'IMO Regulatory Body & Hydrographic Service',
    avatarColor: 'bg-rose-500',
    specialties: ['MARPOL Annex VI', 'CII Grade E Audits', 'SEEMP Part III'],
    answersCount: 118,
    rating: 4.92
  },
  {
    id: 'EXP-003',
    name: 'Chief Eng. Marcus Vance',
    role: 'Alternative Fuels Specialist',
    institution: 'Global Maritime Energy Hub',
    avatarColor: 'bg-indigo-500',
    specialties: ['Green Ammonia Bunkering', 'Dual-Fuel Retrofits', 'Air Lubrication'],
    answersCount: 96,
    rating: 4.88
  }
];

export const INITIAL_EXPERT_QUESTIONS: ExpertQuestionItem[] = [
  {
    id: 'EQ-101',
    title: 'What specific SFOC calibration tolerances are acceptable during Port State Control MARPOL Annex VI audits?',
    questionBody: 'Our vessel is entering Singapore harbor next week. We adjusted our fuel mass flow meter tolerances to +/- 0.25%. Does Port State Control require third-party ISO 17025 certification on the calibration rig?',
    authorName: 'First Officer Tariq Ahmed',
    targetExpertId: 'EXP-002',
    targetExpertName: 'Lt. Cmdr. Sarah Perera',
    category: 'MARPOL Compliance',
    status: 'ANSWERED',
    timestamp: '2 hours ago',
    upvotes: 19,
    expertAnswer: {
      expertName: 'Lt. Cmdr. Sarah Perera',
      expertRole: 'Marine Compliance Auditor',
      answerText: 'Yes. Port State Control in Singapore and Colombo requires Mass Flow Meter (MFM) calibration certificates issued by an accredited ISO 17025 laboratory within the last 12 months. Ensure your digital SEEMP logbook has the calibration stamp hash attached.',
      timestamp: '1 hour ago',
      isVerifiedSolution: true,
      upvotes: 24
    }
  },
  {
    id: 'EQ-102',
    title: 'Can green ammonia bunkering cause localized seawater acidification if boil-off gas is vented through wet scrubbers?',
    questionBody: 'We are analyzing safety protocols for NH3 bunkering barges in Sri Lankan waters. What is the impact of ammonia vapor absorption on coastal marine pH?',
    authorName: 'Dr. Ananya Sen',
    targetExpertId: 'EXP-001',
    targetExpertName: 'Dr. Aris Thorne',
    category: 'Alternative Fuels',
    status: 'ANSWERED',
    timestamp: '5 hours ago',
    upvotes: 14,
    expertAnswer: {
      expertName: 'Dr. Aris Thorne',
      expertRole: 'Chief Oceanographer',
      answerText: 'Ammonia (NH3) forms ammonium hydroxide in water, which actually elevates localized pH (alkaline) rather than acidifying. However, high ammonium concentration is toxic to ocean fish larvae above 0.05 mg/L, so closed-loop catalytic oxidation units are mandatory.',
      timestamp: '3 hours ago',
      isVerifiedSolution: true,
      upvotes: 18
    }
  }
];

interface ExpertQASectionProps {
  onRewardXPAndOD: (xp: number, od: number, msg: string) => void;
}

export const ExpertQASection: React.FC<ExpertQASectionProps> = ({ onRewardXPAndOD }) => {
  const [experts] = useState<VerifiedExpert[]>(INITIAL_VERIFIED_EXPERTS);
  const [questions, setQuestions] = useState<ExpertQuestionItem[]>(INITIAL_EXPERT_QUESTIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAskModal, setShowAskModal] = useState<boolean>(false);

  // ASK EXPERT FORM STATE
  const [selectedExpertId, setSelectedExpertId] = useState<string>('EXP-001');
  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [questionBody, setQuestionBody] = useState<string>('');
  const [questionCategory, setQuestionCategory] = useState<string>('MARPOL Compliance');

  const handleUpvoteQuestion = (qId: string) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  const handleMarkVerifiedSolution = (qId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId && q.expertAnswer) {
        return {
          ...q,
          expertAnswer: { ...q.expertAnswer, isVerifiedSolution: true }
        };
      }
      return q;
    }));
    onRewardXPAndOD(50, 25, '🎉 Marked Verified Expert Solution! Earned +50 XP and +25 $OD!');
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionTitle.trim() || !questionBody.trim()) return;

    const targetExp = experts.find(e => e.id === selectedExpertId);

    const newQ: ExpertQuestionItem = {
      id: `EQ-${Date.now()}`,
      title: questionTitle.trim(),
      questionBody: questionBody.trim(),
      authorName: 'You (Naval Officer)',
      targetExpertId: selectedExpertId,
      targetExpertName: targetExp ? targetExp.name : 'Verified Expert',
      category: questionCategory,
      status: 'PENDING',
      timestamp: 'Just now',
      upvotes: 1
    };

    setQuestions([newQ, ...questions]);
    setShowAskModal(false);
    setQuestionTitle('');
    setQuestionBody('');
    onRewardXPAndOD(20, 10, '🚀 Question submitted to Verified Expert! +20 XP awarded.');
  };

  const filteredQuestions = questions.filter(
    q =>
      !searchQuery ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.questionBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.targetExpertName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/40 rounded-xl">
            <UserCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">UN OCEAN DECADE EXPERT PANEL</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                ACCREDITED Q&amp;A
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Expert Q&amp;A &amp; Verified Consultation Portal</h2>
          </div>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-2 shrink-0 shadow-lg"
        >
          <HelpCircle className="w-4 h-4" />
          <span>ASK A VERIFIED EXPERT</span>
        </button>
      </div>

      {/* VERIFIED EXPERTS ROSTER TILES */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">ACCREDITED MARITIME &amp; CLIMATE EXPERTS</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experts.map((exp) => (
            <div key={exp.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${exp.avatarColor} flex items-center justify-center font-black text-slate-950 text-sm`}>
                  {exp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-black text-white text-xs">{exp.name}</h4>
                  <p className="text-[10px] text-emerald-400 font-sans">{exp.role}</p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-sans">{exp.institution}</p>

              <div className="flex flex-wrap gap-1 pt-1">
                {exp.specialties.map((s, idx) => (
                  <span key={idx} className="bg-slate-950 text-slate-400 border border-slate-800 text-[8px] px-1.5 py-0.5 rounded">
                    #{s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                <span>★ {exp.rating} Rating</span>
                <span>{exp.answersCount} Answers</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH QUESTIONS */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search expert consultations, SFOC calibration, green ammonia, pH impact..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* EXPERT QUESTIONS FEED */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                    {q.category}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    q.status === 'ANSWERED' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {q.status === 'ANSWERED' ? '✓ EXPERT ANSWERED' : '⌛ AWAITING ANSWER'}
                  </span>
                </div>
                <h3 className="text-base font-black text-white">{q.title}</h3>
                <div className="text-xs text-slate-400 font-sans">
                  Asked by <strong className="text-slate-200">{q.authorName}</strong> → Directed to <strong className="text-emerald-400">{q.targetExpertName}</strong> • {q.timestamp}
                </div>
              </div>

              <button
                onClick={() => handleUpvoteQuestion(q.id)}
                className="px-3 py-1.5 bg-slate-950 text-emerald-300 border border-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1 shrink-0 hover:bg-emerald-500/20"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{q.upvotes}</span>
              </button>
            </div>

            <p className="text-slate-300 text-xs font-sans leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              {q.questionBody}
            </p>

            {/* EXPERT VERIFIED ANSWER BLOCK */}
            {q.expertAnswer && (
              <div className="bg-slate-950/90 border border-emerald-500/50 p-4 rounded-xl space-y-2 font-sans animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs font-bold">
                      VERIFIED EXPERT SOLUTION BY {q.expertAnswer.expertName.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{q.expertAnswer.timestamp}</span>
                </div>

                <p className="text-slate-200 text-xs leading-relaxed">{q.expertAnswer.answerText}</p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>MARPOL Audit Standard Verified</span>
                  </span>

                  {!q.expertAnswer.isVerifiedSolution && (
                    <button
                      onClick={() => handleMarkVerifiedSolution(q.id)}
                      className="px-3 py-1 bg-emerald-500 text-slate-950 font-mono font-black text-[10px] uppercase rounded-lg"
                    >
                      ACCEPT AS BEST SOLUTION (+50 XP)
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ASK EXPERT MODAL */}
      {showAskModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono">
          <form onSubmit={handleSubmitQuestion} className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">Ask an Accredited Maritime Expert</h3>
              <button
                type="button"
                onClick={() => setShowAskModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Select Target Expert</label>
                <select
                  value={selectedExpertId}
                  onChange={(e) => setSelectedExpertId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-white"
                >
                  {experts.map(exp => (
                    <option key={exp.id} value={exp.id}>
                      {exp.name} ({exp.role} - {exp.institution})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Question Category</label>
                <select
                  value={questionCategory}
                  onChange={(e) => setQuestionCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-white"
                >
                  <option value="MARPOL Compliance">MARPOL Annex VI &amp; CII Compliance</option>
                  <option value="Alternative Fuels">Green Ammonia &amp; Hydrogen Bunkering</option>
                  <option value="Blue Carbon">Blue Carbon Sequestration &amp; Credits</option>
                  <option value="Acoustics & Biotech">Marine Hydroacoustics &amp; Plastics</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Question Title</label>
                <input
                  type="text"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  placeholder="e.g. Mass Flow Meter calibration standards in Singapore"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Question Details &amp; Telemetry</label>
                <textarea
                  value={questionBody}
                  onChange={(e) => setQuestionBody(e.target.value)}
                  rows={4}
                  placeholder="Provide specific details or vessel telemetry for the expert..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAskModal(false)}
                className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl"
              >
                SUBMIT QUESTION (+20 XP)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
