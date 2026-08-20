import React, { useState } from 'react';
import { HeartPulse, Smile, AlertCircle, ShieldCheck, Zap, UserCheck, RefreshCw, Sparkles } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CrewWelfareOfficer {
  id: string;
  name: string;
  role: string;
  fatigueIndexPct: number;
  sleepQualityHrs: number;
  stressLevel: 'LOW' | 'MODERATE' | 'HIGH';
  shiftStatus: 'ON_WATCH' | 'REST_PERIOD' | 'STANDBY';
  aiRecommendation: string;
}

const INITIAL_CREW: CrewWelfareOfficer[] = [
  {
    id: 'CREW-01',
    name: 'Capt. A. Lindqvist',
    role: 'Master / Commanding Officer',
    fatigueIndexPct: 34,
    sleepQualityHrs: 7.2,
    stressLevel: 'MODERATE',
    shiftStatus: 'ON_WATCH',
    aiRecommendation: 'Optimal alertness. Schedule 2-hour rest before entering High Risk Area at 22:00 UTC.'
  },
  {
    id: 'CREW-02',
    name: 'Chief Officer M. Kowalski',
    role: 'Chief Navigation Officer',
    fatigueIndexPct: 78,
    sleepQualityHrs: 4.1,
    stressLevel: 'HIGH',
    shiftStatus: 'ON_WATCH',
    aiRecommendation: 'CRITICAL FATIGUE WARNING: Exceeds 14-hour STCW limit. Immediately rotate 2nd Officer to helm.'
  },
  {
    id: 'CREW-03',
    name: '2nd Mate S. Thorne',
    role: 'Radar Watch Officer',
    fatigueIndexPct: 18,
    sleepQualityHrs: 8.5,
    stressLevel: 'LOW',
    shiftStatus: 'REST_PERIOD',
    aiRecommendation: 'Fully rested & ready for high-risk night radar watch rotation.'
  }
];

export const CrewWelfareAIEngine: React.FC = () => {
  const [crewList, setCrewList] = useState<CrewWelfareOfficer[]>(INITIAL_CREW);
  const [aiWellnessSummary, setAiWellnessSummary] = useState<string | null>(null);

  const handleRotateShift = (id: string) => {
    hapticEngine.trigger('success');
    setCrewList(
      crewList.map((c) =>
        c.id === id
          ? {
              ...c,
              shiftStatus: c.shiftStatus === 'ON_WATCH' ? 'REST_PERIOD' : 'ON_WATCH',
              fatigueIndexPct: c.shiftStatus === 'ON_WATCH' ? 20 : 60
            }
          : c
      )
    );
  };

  const handleRunCrewWellnessAi = () => {
    hapticEngine.trigger('alert');
    setAiWellnessSummary(
      'AI Crew Welfare Assessment: Overall crew resilience score is 88%. Rotated Chief Officer Kowalski to rest bay to guarantee 100% alertness during Bab el-Mandeb transit.'
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <HeartPulse className="w-4 h-4 text-cyan-400" />
            <span>AI Crew Psychological Welfare, Fatigue & STCW Rest Monitor</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            AI-monitored sleep biometric metrics, fatigue risk indices, and optimal shift rotation scheduling during intense piracy transits
          </p>
        </div>

        <button
          onClick={handleRunCrewWellnessAi}
          className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>EVALUATE CREW WELLNESS AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {crewList.map((officer) => (
          <div
            key={officer.id}
            className={`p-4 rounded-2xl border transition-all space-y-3 ${
              officer.fatigueIndexPct > 70
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">{officer.name}</span>
                <span className="text-[9px] text-slate-400 block font-sans">{officer.role}</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                  officer.shiftStatus === 'ON_WATCH'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {officer.shiftStatus.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-400">Fatigue Risk Index:</span>
                <span className={officer.fatigueIndexPct > 70 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {officer.fatigueIndexPct}%
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${officer.fatigueIndexPct > 70 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                  style={{ width: `${officer.fatigueIndexPct}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-[9px] text-slate-300 space-y-1">
              <span className="text-cyan-400 font-bold block">AI Rest Advisor:</span>
              <p className="font-sans leading-tight">{officer.aiRecommendation}</p>
            </div>

            <button
              onClick={() => handleRotateShift(officer.id)}
              className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-[9px] font-bold"
            >
              ROTATE WATCH SHIFT
            </button>
          </div>
        ))}
      </div>

      {aiWellnessSummary && (
        <div className="bg-cyan-950/80 border border-cyan-500/80 p-3.5 rounded-2xl text-[10px] text-cyan-200 font-mono space-y-1">
          <span className="font-bold text-cyan-300 block">AI Crew Welfare Summary:</span>
          <p className="font-sans text-cyan-100">{aiWellnessSummary}</p>
        </div>
      )}
    </div>
  );
};
