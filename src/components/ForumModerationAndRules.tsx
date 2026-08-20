import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, Flag, Lock, Unlock, Pin, CheckCircle, 
  Trash2, AlertTriangle, Eye, Filter, UserCheck, MessageSquare, Zap
} from 'lucide-react';

export interface FlaggedItem {
  id: string;
  threadId: string;
  title: string;
  author: string;
  flagReason: string;
  flaggedBy: string;
  timestamp: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
}

interface ForumModerationAndRulesProps {
  isModeratorMode: boolean;
  onToggleModeratorMode: () => void;
  onFlagThread: (threadId: string, reason: string) => void;
  onLockThread: (threadId: string) => void;
  onPinThread: (threadId: string) => void;
  flaggedCount: number;
}

export const ForumModerationAndRules: React.FC<ForumModerationAndRulesProps> = ({
  isModeratorMode,
  onToggleModeratorMode,
  onFlagThread,
  onLockThread,
  onPinThread,
  flaggedCount
}) => {
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([
    {
      id: 'FLAG-001',
      threadId: 'TH-001',
      title: 'How is your fleet preparing for the 2026 MARPOL CII Grade E mandatory penalty audits?',
      author: 'Capt. Vikram Sethi',
      flagReason: 'Potential unverified operational numbers',
      flaggedBy: 'Auditor_Perera',
      timestamp: '1 hour ago',
      status: 'PENDING'
    }
  ]);

  const [selectedReason, setSelectedReason] = useState<string>('Off-topic or spam');
  const [targetThreadId, setTargetThreadId] = useState<string>('');
  const [showFlagModal, setShowFlagModal] = useState<boolean>(false);

  const handleResolveFlag = (id: string) => {
    setFlaggedItems(prev => prev.map(item => item.id === id ? { ...item, status: 'RESOLVED' } : item));
  };

  const handleDismissFlag = (id: string) => {
    setFlaggedItems(prev => prev.map(item => item.id === id ? { ...item, status: 'DISMISSED' } : item));
  };

  const handleSubmitFlagModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetThreadId) return;
    onFlagThread(targetThreadId, selectedReason);
    setShowFlagModal(false);
    setTargetThreadId('');
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* MODERATION BAR HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl border ${isModeratorMode ? 'bg-rose-500/20 border-rose-400 text-rose-400' : 'bg-indigo-500/20 border-indigo-400 text-indigo-400'}`}>
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">COMMUNITY GOVERNANCE</span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                AUTO-MOD SHIELD ACTIVE
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Forum Moderation &amp; Rules Compliance</h2>
          </div>
        </div>

        <button
          onClick={onToggleModeratorMode}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 border shadow-lg ${
            isModeratorMode
              ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 border-rose-400'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isModeratorMode ? 'DISABLE MODERATOR SHIELD' : 'ENABLE MODERATOR MODE'}</span>
        </button>
      </div>

      {/* AUTO-MODERATION RULES SUMMARY TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">SPAM &amp; PROFANITY SHIELD</span>
          <strong className="text-emerald-400 font-black text-sm flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>100% AUTOMATED SCANNING</span>
          </strong>
          <span className="text-[10px] text-slate-500 font-sans">Blocks unauthorized ads &amp; non-MARPOL spam</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">REPORTED THREADS QUEUE</span>
          <strong className="text-amber-300 font-black text-sm flex items-center space-x-1">
            <Flag className="w-4 h-4 text-amber-400" />
            <span>{flaggedItems.filter(i => i.status === 'PENDING').length} PENDING REVIEW</span>
          </strong>
          <span className="text-[10px] text-slate-500 font-sans">Awaiting moderator verification</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">COMMUNITY CODE OF CONDUCT</span>
          <strong className="text-cyan-300 font-black text-sm flex items-center space-x-1">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>UN OCEAN DECADE STANDARD</span>
          </strong>
          <span className="text-[10px] text-slate-500 font-sans">Scientific citations required for claims</span>
        </div>
      </div>

      {/* MODERATION QUEUE FOR MODERATOR MODE */}
      {isModeratorMode && (
        <div className="bg-slate-900 border border-rose-500/40 p-5 rounded-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-rose-400 uppercase flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>MODERATOR REVIEW QUEUE</span>
            </span>
            <span className="text-[10px] text-slate-400">Moderator Access Level: Chief Auditor</span>
          </div>

          <div className="space-y-3">
            {flaggedItems.map((item) => (
              <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    item.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    STATUS: {item.status}
                  </span>
                  <span className="text-slate-500 text-[10px]">{item.timestamp}</span>
                </div>

                <h4 className="font-bold text-white">{item.title}</h4>
                <div className="text-[11px] text-slate-400 font-sans">
                  Reported by <strong className="text-slate-300">{item.flaggedBy}</strong> • Reason: <span className="text-rose-300 font-mono">{item.flagReason}</span>
                </div>

                {item.status === 'PENDING' && (
                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => handleResolveFlag(item.id)}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-[10px] uppercase transition-all"
                    >
                      APPROVE &amp; CLEAR FLAG
                    </button>
                    <button
                      onClick={() => onLockThread(item.threadId)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[10px] uppercase transition-all"
                    >
                      LOCK THREAD
                    </button>
                    <button
                      onClick={() => handleDismissFlag(item.id)}
                      className="px-3 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-[10px] uppercase font-bold"
                    >
                      DISMISS REPORT
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
