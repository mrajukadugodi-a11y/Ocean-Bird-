import React, { useState } from 'react';
import { MessageSquare, HeartPulse, Sparkles, Smile, Frown, Meh, AlertCircle, ShieldCheck } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface SentimentLog {
  timestamp: string;
  source: 'DECK_RADIO' | 'DRILL_FEEDBACK' | 'CITADEL_LOG';
  sentimentScore: number; // -1.0 to 1.0
  moodLabel: 'CONFIDENT & READY' | 'MODERATE ANXIETY' | 'HIGH STRESS';
  extractedKeywords: string[];
}

const SAMPLE_SENTIMENTS: SentimentLog[] = [
  {
    timestamp: '10 mins ago',
    source: 'DRILL_FEEDBACK',
    sentimentScore: 0.82,
    moodLabel: 'CONFIDENT & READY',
    extractedKeywords: ['drill swift', 'citadel door sealed', 'water cannon ready']
  },
  {
    timestamp: '35 mins ago',
    source: 'DECK_RADIO',
    sentimentScore: -0.25,
    moodLabel: 'MODERATE ANXIETY',
    extractedKeywords: ['skiff approach speed', 'night vision check', 'radar blip']
  },
  {
    timestamp: '1 hour ago',
    source: 'CITADEL_LOG',
    sentimentScore: 0.91,
    moodLabel: 'CONFIDENT & READY',
    extractedKeywords: ['air scrubber nominal', 'secure coms link', 'escort in sight']
  }
];

export const CrewSentimentAnalysisView: React.FC = () => {
  const [sentimentList] = useState<SentimentLog[]>(SAMPLE_SENTIMENTS);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>AI Crew Psychological Sentiment & Drill Feedback NLP Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Natural language sentiment parsing from radio comms, citadel logs, and anti-piracy drill debriefs
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          FLEET MORALE INDEX: 88.4%
        </span>
      </div>

      <div className="space-y-2">
        {sentimentList.map((log, idx) => (
          <div
            key={idx}
            className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[9px] text-slate-500 font-bold">{log.timestamp}</span>
                <span className="bg-slate-900 border border-slate-800 text-[8px] text-slate-300 px-1.5 py-0.5 rounded font-bold">
                  {log.source.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-bold ${
                    log.sentimentScore > 0.3
                      ? 'text-emerald-400'
                      : log.sentimentScore < -0.1
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}
                >
                  {log.moodLabel}
                </span>
                <span className="text-[10px] text-slate-400">({(log.sentimentScore * 100).toFixed(0)} Sentiment Score)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {log.extractedKeywords.map((kw, i) => (
                <span key={i} className="bg-slate-900 text-cyan-300 text-[8px] px-2 py-0.5 rounded border border-slate-800 font-bold">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
