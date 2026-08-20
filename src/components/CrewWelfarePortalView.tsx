import React, { useState, useEffect } from 'react';
import {
  Users,
  Wifi,
  Heart,
  Calendar,
  ShieldCheck,
  PhoneCall,
  Clock,
  Sparkles,
  CheckCircle2,
  Award,
  CreditCard,
  MessageSquare,
  Activity,
  Zap,
  Eye,
  RotateCcw,
  Check,
  AlertCircle,
  ThumbsUp,
  Sliders
} from 'lucide-react';

export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  nationality: string;
  contractDaysRemaining: number;
  wifiAllowanceMb: number;
  wifiUsedMb: number;
  mlcRestHoursStatus: 'COMPLIANT' | 'WARNING';
  shoreLeaveStatus: 'APPROVED' | 'PENDING' | 'DENIED';
}

export interface ErgonomicExercise {
  id: string;
  title: string;
  targetArea: string;
  recommendedShift: string;
  durationSec: number;
  instructions: string[];
  benefits: string;
}

const ERGONOMIC_EXERCISES: ErgonomicExercise[] = [
  {
    id: 'ERGO-01',
    title: 'ECDIS & Radar Neck Cervical Reset',
    targetArea: 'Cervical Spine & Upper Trapezius',
    recommendedShift: '4-Hour ECDIS / Radar Screen Watch',
    durationSec: 60,
    instructions: [
      'Gently tuck chin toward chest while keeping shoulders relaxed down.',
      'Hold chin tuck for 5 seconds, then slowly tilt head to the right shoulder.',
      'Repeat on the left side, breathing deeply for 3 full cycles.'
    ],
    benefits: 'Prevents forward-head posture strain caused by continuous monitoring of electronic chart displays.'
  },
  {
    id: 'ERGO-02',
    title: 'Bridge Standing Lumbar Extension',
    targetArea: 'Lower Back & Hip Flexors',
    recommendedShift: 'Standing Helmsman / Conning Duty',
    durationSec: 90,
    instructions: [
      'Stand with feet shoulder-width apart on anti-fatigue deck mat.',
      'Place palms on lower back just above hips.',
      'Gently arch spine backward while engaging core, looking toward wheelhouse overhead for 10 seconds.'
    ],
    benefits: 'Counteracts spinal compression caused by vessel vibration and prolonged standing on steel decks.'
  },
  {
    id: 'ERGO-03',
    title: 'Sedentary Anti-Thrombosis Calf Pumps',
    targetArea: 'Calves, Ankles & Venous Return',
    recommendedShift: 'Engine Control Room / Radio Desk',
    durationSec: 60,
    instructions: [
      'While seated, lift heels high off deck while keeping toes grounded.',
      'Hold for 2 seconds, then lower heels and lift toes toward shins.',
      'Perform 20 repetitions to stimulate lower limb circulation.'
    ],
    benefits: 'Reduces risk of Deep Vein Thrombosis (DVT) and leg swelling during long seated watchkeeping shifts.'
  },
  {
    id: 'ERGO-04',
    title: 'Lookout Thoracic & Shoulder Blade Squeeze',
    targetArea: 'Chest, Pectorals & Mid-Back',
    recommendedShift: 'Lookout & Binocular Observation',
    durationSec: 60,
    instructions: [
      'Interlock fingers behind lower back or hold a clean towel.',
      'Gently squeeze shoulder blades together and open chest wide.',
      'Inhale deeply for 4 seconds, expand chest, and exhale slowly.'
    ],
    benefits: 'Relieves rounded-shoulder slouching from holding heavy binoculars or leaning on bridge consoles.'
  },
  {
    id: 'ERGO-05',
    title: 'ECDIS Mouse & Throttle Wrist Stretch',
    targetArea: 'Forearm Flexors & Carpal Tunnel',
    recommendedShift: 'DP Control & ECDIS Navigation Desk',
    durationSec: 45,
    instructions: [
      'Extend right arm straight forward with palm facing up.',
      'Use left hand to gently pull fingers downward toward deck.',
      'Hold stretch for 15 seconds, then switch to left arm.'
    ],
    benefits: 'Prevents repetitive strain injury (RSI) and carpal tunnel syndrome from trackball/mouse control.'
  }
];

const POSTURE_CHECKLIST = [
  'ECDIS and Radar screen top edge positioned at or slightly below eye level.',
  'Standing on anti-fatigue rubber mat with knees slightly flexed to absorb wave motion.',
  'Practicing 20-20-20 eye strain rule: look at sea horizon 20 feet away for 20 seconds every 20 mins.',
  'Weight evenly distributed across both feet to balance against vessel heel and roll.',
  'Engine room desk chair adjusted so feet rest flat on deck plate with 90° knee angle.'
];

const CREW_ROSTER: CrewMember[] = [
  {
    id: 'CREW-101',
    name: 'Capt. Rajesh Kumar',
    rank: 'Master',
    nationality: '🇮🇳 India',
    contractDaysRemaining: 42,
    wifiAllowanceMb: 10000,
    wifiUsedMb: 6200,
    mlcRestHoursStatus: 'COMPLIANT',
    shoreLeaveStatus: 'APPROVED'
  },
  {
    id: 'CREW-102',
    name: 'Vikram Sharma',
    rank: 'Chief Engineer',
    nationality: '🇮🇳 India',
    contractDaysRemaining: 18,
    wifiAllowanceMb: 10000,
    wifiUsedMb: 9400,
    mlcRestHoursStatus: 'COMPLIANT',
    shoreLeaveStatus: 'APPROVED'
  },
  {
    id: 'CREW-103',
    name: 'Marco Rossi',
    rank: '2nd Officer',
    nationality: '🇮🇹 Italy',
    contractDaysRemaining: 110,
    wifiAllowanceMb: 8000,
    wifiUsedMb: 4100,
    mlcRestHoursStatus: 'COMPLIANT',
    shoreLeaveStatus: 'PENDING'
  },
  {
    id: 'CREW-104',
    name: 'Anand Patel',
    rank: '3rd Engineer',
    nationality: '🇮🇳 India',
    contractDaysRemaining: 145,
    wifiAllowanceMb: 8000,
    wifiUsedMb: 7900,
    mlcRestHoursStatus: 'WARNING',
    shoreLeaveStatus: 'APPROVED'
  }
];

export const CrewWelfarePortalView: React.FC = () => {
  const [crewList, setCrewList] = useState<CrewMember[]>(CREW_ROSTER);
  const [selectedCrew, setSelectedCrew] = useState<CrewMember>(CREW_ROSTER[0]);
  const [extraWifiRequested, setExtraWifiRequested] = useState<boolean>(false);
  const [activePortalTab, setActivePortalTab] = useState<'WELFARE' | 'ERGONOMICS'>('WELFARE');

  // Ergonomics state
  const [completedExercises, setCompletedExercises] = useState<string[]>(['ERGO-01']);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [activeTimerExerciseId, setActiveTimerExerciseId] = useState<string | null>(null);
  const [checkedPostureItems, setCheckedPostureItems] = useState<number[]>([0, 1, 2]);

  const requestExtraWifi = () => {
    setExtraWifiRequested(true);
    setCrewList(
      crewList.map((c) =>
        c.id === selectedCrew.id ? { ...c, wifiAllowanceMb: c.wifiAllowanceMb + 2000 } : c
      )
    );
    setSelectedCrew({ ...selectedCrew, wifiAllowanceMb: selectedCrew.wifiAllowanceMb + 2000 });
    setTimeout(() => setExtraWifiRequested(false), 3000);
  };

  const toggleExerciseCompletion = (id: string) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter((e) => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const startExerciseTimer = (id: string, durationSec: number) => {
    setActiveTimerExerciseId(id);
    setTimerSecondsLeft(durationSec);
  };

  useEffect(() => {
    if (timerSecondsLeft === null || timerSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setTimerSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSecondsLeft]);

  const togglePostureCheck = (index: number) => {
    if (checkedPostureItems.includes(index)) {
      setCheckedPostureItems(checkedPostureItems.filter((i) => i !== index));
    } else {
      setCheckedPostureItems([...checkedPostureItems, index]);
    }
  };

  return (
    <div id="crew-welfare-portal-view" className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>ILO MARITIME LABOUR CONVENTION (MLC 2006) CREW WELFARE & ERGONOMICS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Users className="w-6 h-6 text-teal-400" />
              <span>Seafarer Welfare & Maritime Ergonomics Portal</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Dedicated welfare hub for crew members. Manage satellite Starlink Wi-Fi data tokens, MLC 2006 work/rest hours logs, 24/7 psychological helpline support, and watchkeeping posture ergonomics.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">CREW ROSTER</span>
              <strong className="text-teal-400 text-sm">24 ONBOARD</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">MLC REST COMPLIANCE</span>
              <strong className="text-emerald-400 text-sm">98.2%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center space-x-2 text-xs font-mono">
        <button
          onClick={() => setActivePortalTab('WELFARE')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
            activePortalTab === 'WELFARE'
              ? 'bg-teal-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>CREW WELFARE & SATELLITE WI-FI</span>
        </button>

        <button
          onClick={() => setActivePortalTab('ERGONOMICS')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
            activePortalTab === 'ERGONOMICS'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>MARITIME ERGONOMICS & WATCHKEEPING EXERCISES</span>
        </button>
      </div>

      {/* Tab 1: Crew Welfare & Wi-Fi Dossier */}
      {activePortalTab === 'WELFARE' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          {/* Left Column: Crew Roster */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Users className="w-4 h-4 text-teal-400" />
              <span>Onboard Seafarers Roster</span>
            </h3>

            <div className="space-y-3">
              {crewList.map((crew) => {
                const isSelected = selectedCrew.id === crew.id;

                return (
                  <div
                    key={crew.id}
                    onClick={() => setSelectedCrew(crew)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-lg space-y-2 ${
                      isSelected
                        ? 'bg-slate-900 border-teal-500 ring-1 ring-teal-500'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <div>
                        <strong className="text-white text-sm block">{crew.name}</strong>
                        <span className="text-[10px] text-slate-400">{crew.rank} • {crew.nationality}</span>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-teal-300 font-bold">
                        {crew.contractDaysRemaining} Days Left
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>
                        <span className="text-[9px] text-slate-500 block">SATELLITE WI-FI</span>
                        <strong>{Math.round((crew.wifiUsedMb / crew.wifiAllowanceMb) * 100)}% Used</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">MLC REST HOURS</span>
                        <strong className={crew.mlcRestHoursStatus === 'COMPLIANT' ? 'text-emerald-400' : 'text-amber-400'}>
                          {crew.mlcRestHoursStatus}
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Crew Member Welfare Controls (2 Spans) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-teal-400 font-bold uppercase block">CREW WELFARE DOSSIER</span>
                  <h3 className="font-bold text-white text-lg">{selectedCrew.name} ({selectedCrew.rank})</h3>
                  <p className="text-xs text-slate-400">{selectedCrew.nationality} • Contract ID: {selectedCrew.id}</p>
                </div>

                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-300">
                  ACTIVE ONBOARD
                </span>
              </div>

              {/* Wi-Fi Token Management */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase">
                    <Wifi className="w-4 h-4 text-teal-400" />
                    <span>Starlink Satellite Wi-Fi Data Allowance</span>
                  </div>
                  <span className="text-xs text-slate-300">
                    {selectedCrew.wifiUsedMb} MB / {selectedCrew.wifiAllowanceMb} MB
                  </span>
                </div>

                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-teal-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedCrew.wifiUsedMb / selectedCrew.wifiAllowanceMb) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Free 10GB monthly allowance allocated under ISWAN MLC guidelines.
                  </span>
                  <button
                    onClick={requestExtraWifi}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>GRANT +2GB EXTRA DATA</span>
                  </button>
                </div>

                {extraWifiRequested && (
                  <p className="text-xs text-emerald-400 font-bold text-right animate-pulse">
                    ✅ 2,000 MB Satellite Wi-Fi Token Granted!
                  </p>
                )}
              </div>

              {/* Helpline & Mental Tele-counseling support */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase">
                  <PhoneCall className="w-4 h-4 text-purple-400" />
                  <span>24/7 Confidential Seafarer Mental Health Helpline</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Free, confidential 24/7 psychological tele-counseling provided by ISWAN SeafarerHelp in 12 languages. Satellite call charges fully covered by shipowner.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold rounded-lg text-xs">
                    SATELLITE DIAL: +44 20 7323 2737
                  </span>
                  <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs">
                    WHATSAPP: +44 7909 016 619
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Maritime Ergonomics Module */}
      {activePortalTab === 'ERGONOMICS' && (
        <div className="space-y-6 font-mono">
          {/* Top Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">WATCHKEEPING EXERCISES</span>
              <strong className="text-emerald-400 text-sm flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedExercises.length} / {ERGONOMIC_EXERCISES.length} COMPLETED TODAY</span>
              </strong>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">ACTIVE MICRO-BREAK TIMER</span>
              <strong className="text-amber-400 text-sm flex items-center space-x-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {timerSecondsLeft !== null && timerSecondsLeft > 0
                    ? `${timerSecondsLeft}s REMAINING`
                    : 'READY FOR STRETCH'}
                </span>
              </strong>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase block">POSTURE CHECKLIST</span>
              <strong className="text-cyan-400 text-sm flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{checkedPostureItems.length} / {POSTURE_CHECKLIST.length} VERIFIED</span>
              </strong>
            </div>
          </div>

          {/* Main Grid: Exercises Library (Left 2 Spans) + Watchkeeping Posture Checklist (Right 1 Span) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Exercises Cards List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Maritime Ergonomic Micro-Exercises for Seafarers</span>
                </h3>
                <span className="text-xs text-emerald-400">5 TAILORED DRILLS</span>
              </div>

              <div className="space-y-4">
                {ERGONOMIC_EXERCISES.map((ex) => {
                  const isDone = completedExercises.includes(ex.id);
                  const isTimerActive = activeTimerExerciseId === ex.id && timerSecondsLeft !== null && timerSecondsLeft > 0;

                  return (
                    <div
                      key={ex.id}
                      className={`p-5 rounded-2xl border transition-all shadow-xl space-y-3 ${
                        isDone
                          ? 'bg-slate-900/90 border-emerald-500/80 ring-1 ring-emerald-500/40'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <strong className="text-white text-sm">{ex.title}</strong>
                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-amber-300 font-bold">
                              {ex.durationSec}s
                            </span>
                          </div>
                          <span className="text-[11px] text-teal-400 block font-sans mt-0.5">
                            Target: {ex.targetArea} • Shift: {ex.recommendedShift}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => startExerciseTimer(ex.id, ex.durationSec)}
                            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 rounded-xl text-xs font-bold flex items-center space-x-1"
                          >
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{isTimerActive ? `${timerSecondsLeft}s` : 'START TIMER'}</span>
                          </button>

                          <button
                            onClick={() => toggleExerciseCompletion(ex.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isDone ? 'COMPLETED' : 'MARK DONE'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                        <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                          Step-by-Step Technique:
                        </span>
                        <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                          {ex.instructions.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefit banner */}
                      <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-emerald-300 font-sans flex items-start space-x-2">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Watchkeeping Ergonomic Benefit:</strong> {ex.benefits}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Watchkeeping Posture Audit Checklist */}
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Watchkeeping Posture Self-Audit</span>
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-mono">SOLAS / MLC</span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Perform this quick posture check before taking over the 4-hour navigation or engineering watch:
                </p>

                <div className="space-y-2.5">
                  {POSTURE_CHECKLIST.map((item, index) => {
                    const isChecked = checkedPostureItems.includes(index);

                    return (
                      <div
                        key={index}
                        onClick={() => togglePostureCheck(index)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all text-xs font-sans flex items-start space-x-2.5 ${
                          isChecked
                            ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-amber-300 font-sans flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Report broken anti-fatigue mats or unadjustable ECDIS chairs to the Safety Officer.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

