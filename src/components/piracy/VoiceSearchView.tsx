import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Search, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export const VoiceSearchView: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string | null>(null);

  const startVoiceSearchSimulation = () => {
    hapticEngine.trigger('click');
    setIsListening(true);
    setTranscript('Listening for maritime bridge voice command...');

    const sampleCommands = [
      'Show Red Sea piracy threat alerts',
      'Filter vessels in Baltic Sea GPS spoofing zone',
      'Display Port of Rotterdam security compliance rating',
      'Check sea surface temperature thermal anomalies'
    ];

    const randomCmd = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];

    setTimeout(() => {
      setTranscript(`"${randomCmd}"`);
      setIsListening(false);
      setLastExecutedCommand(randomCmd);
      hapticEngine.trigger('success');
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Mic className="w-4 h-4 text-cyan-400" />
            <span>Bridge Hands-Free Voice Search & Command Recognition</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Speak natural voice commands to instantly filter AIS radar targets, threat logs, and weather charts
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          VOICE COMMAND READY
        </span>
      </div>

      {/* Interactive Voice Search Button */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 text-center">
        <button
          onClick={startVoiceSearchSimulation}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-rose-500 text-slate-950 animate-pulse ring-8 ring-rose-500/30'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/20 shadow-xl'
          }`}
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white">
            {isListening ? 'LISTENING TO BRIDGE AUDIO...' : 'TAP MICROPHONE TO SPEAK COMMAND'}
          </h4>
          <p className="text-[10px] text-cyan-300 font-mono">{transcript || 'Try saying: "Filter Baltic Sea alerts" or "Show Port Ratings"'}</p>
        </div>
      </div>

      {lastExecutedCommand && (
        <div className="bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl text-emerald-300 text-[10px] flex items-center space-x-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Voice command executed: {lastExecutedCommand}</span>
        </div>
      )}
    </motion.div>
  );
};
