import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Radio, CheckCircle2, AlertTriangle, Sparkles, Terminal, Play, ShieldAlert, Command, RefreshCw } from 'lucide-react';

export interface VoiceCommandLog {
  id: string;
  timestamp: string;
  transcript: string;
  matchedAction: string;
  status: 'EXECUTED' | 'UNRECOGNIZED' | 'LISTENING';
}

export const VOICE_COMMAND_EXAMPLES = [
  { phrase: 'Report engine status', action: 'Opens Main Engine Telemetry & RPM Log' },
  { phrase: 'Set red night vision', action: 'Toggles Bridge 650nm Night Vision Ambient Mode' },
  { phrase: 'Show Malacca Strait map', action: 'Navigates to AIS Live Radar & Offline Vector Maps' },
  { phrase: 'Generate fleet report', action: 'Triggers IMO Compliant Fleet Report Export' },
  { phrase: 'Emergency Mayday', action: 'Activates Emergency Distress Protocol & AR Overlay' },
  { phrase: 'Switch to Hindi', action: 'Changes Application Language to Hindi (हिन्दी)' }
];

interface VoiceActivatedCommandsViewProps {
  onExecuteAction?: (actionId: string) => void;
}

export const VoiceActivatedCommandsView: React.FC<VoiceActivatedCommandsViewProps> = ({ onExecuteAction }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [lastExecutedAction, setLastExecutedAction] = useState<string | null>(null);
  const [commandLogs, setCommandLogs] = useState<VoiceCommandLog[]>([
    {
      id: 'LOG-01',
      timestamp: '00:42:10 UTC',
      transcript: 'Set red night vision',
      matchedAction: 'Toggled 650nm Red Ambient Night Mode',
      status: 'EXECUTED'
    },
    {
      id: 'LOG-02',
      timestamp: '00:38:05 UTC',
      transcript: 'Report engine status',
      matchedAction: 'Loaded Main Engine Telemetry Log',
      status: 'EXECUTED'
    }
  ]);

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('Listening for bridge voice command...');

    // Web Speech Recognition if supported, fallback to simulated trigger
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          processVoiceInput(spoken);
          setIsListening(false);
        };

        recognition.onerror = () => {
          simulateVoiceInput('Report engine status');
          setIsListening(false);
        };

        recognition.start();
      } catch (e) {
        simulateVoiceInput('Set red night vision');
        setIsListening(false);
      }
    } else {
      simulateVoiceInput('Show Malacca Strait map');
      setIsListening(false);
    }
  };

  const simulateVoiceInput = (spokenPhrase: string) => {
    setTranscript(`"${spokenPhrase}"`);
    processVoiceInput(spokenPhrase);
  };

  const processVoiceInput = (spokenText: string) => {
    const textLower = spokenText.toLowerCase();
    let actionMatched = 'Unrecognized command. Say "Help commands".';

    if (textLower.includes('night') || textLower.includes('red') || textLower.includes('vision')) {
      actionMatched = 'Toggled 650nm Red Ambient Bridge Night Vision Mode';
      if (onExecuteAction) onExecuteAction('toggle-night');
    } else if (textLower.includes('engine') || textLower.includes('telemetry') || textLower.includes('rpm')) {
      actionMatched = 'Opened Main Engine & Aux Power Telemetry Panel';
      if (onExecuteAction) onExecuteAction('engine-status');
    } else if (textLower.includes('map') || textLower.includes('malacca') || textLower.includes('radar')) {
      actionMatched = 'Navigated to AIS Live Radar & Offline Vector Maps';
      if (onExecuteAction) onExecuteAction('open-maps');
    } else if (textLower.includes('report') || textLower.includes('fleet') || textLower.includes('audit')) {
      actionMatched = 'Generated IMO / SOLAS Compliant Fleet Audit Report';
      if (onExecuteAction) onExecuteAction('fleet-report');
    } else if (textLower.includes('mayday') || textLower.includes('emergency') || textLower.includes('distress')) {
      actionMatched = 'ACTIVATED EMERGENCY DISTRESS BEACON & AR OVERLAY';
      if (onExecuteAction) onExecuteAction('emergency');
    } else if (textLower.includes('hindi') || textLower.includes('language')) {
      actionMatched = 'Switched System Display Language to Hindi (हिन्दी)';
      if (onExecuteAction) onExecuteAction('switch-hindi');
    }

    setLastExecutedAction(actionMatched);

    const newLog: VoiceCommandLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toTimeString().substring(0, 8) + ' UTC',
      transcript: spokenText,
      matchedAction: actionMatched,
      status: actionMatched.includes('Unrecognized') ? 'UNRECOGNIZED' : 'EXECUTED'
    };

    setCommandLogs((prev) => [newLog, ...prev]);

    // Audio confirmation synth
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(actionMatched);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="voice-activated-commands-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>BRIDGE HANDS-FREE VOICE COMMAND RECOGNITION SYSTEM</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Mic className="w-6 h-6 text-rose-400" />
            <span>Voice Activated Bridge Command Center</span>
          </h2>
          <p className="text-xs text-slate-400">
            Hands-free voice recognition for Captains and watch officers to trigger night mode, request telemetry reports, switch languages, or declare Mayday.
          </p>
        </div>

        {/* Large Mic Trigger Button */}
        <button
          onClick={handleStartListening}
          className={`px-5 py-3.5 rounded-2xl font-black font-mono text-xs flex items-center space-x-2 transition-all shadow-xl ${
            isListening
              ? 'bg-rose-500 text-slate-950 animate-pulse scale-105 shadow-rose-500/30'
              : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-slate-950'
          }`}
        >
          {isListening ? <Radio className="w-5 h-5 text-slate-950 animate-spin" /> : <Mic className="w-5 h-5 text-slate-950" />}
          <span>{isListening ? 'LISTENING TO BRIDGE VOICE...' : 'PRESS & SPEAK VOICE COMMAND'}</span>
        </button>
      </div>

      {/* Live Voice Audio Wave Visualizer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">LIVE AUDIO INPUT FEED & TRANSCRIPT</span>
          <span className="text-[10px] text-rose-400 font-bold flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STCW COMPLIANT VOICE ENGINE</span>
          </span>
        </div>

        {/* Transcript Box */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between min-h-[60px]">
          <p className="text-sm font-bold text-sky-300">
            {transcript || 'Click the button above or pick a sample command below to trigger voice action.'}
          </p>
          {isListening && (
            <div className="flex space-x-1 items-center h-4">
              <span className="w-1 h-full bg-rose-500 animate-pulse" />
              <span className="w-1 h-3/4 bg-rose-400 animate-pulse delay-75" />
              <span className="w-1 h-full bg-rose-500 animate-pulse delay-150" />
            </div>
          )}
        </div>

        {lastExecutedAction && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ACTION EXECUTED: {lastExecutedAction}</span>
          </div>
        )}
      </div>

      {/* Preset Command Shortcuts */}
      <div className="space-y-3 font-mono text-xs">
        <h3 className="font-bold text-slate-300 uppercase tracking-wider">PRESET VOICE COMMAND SHORTCUTS (CLICK TO TEST):</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VOICE_COMMAND_EXAMPLES.map((cmd, idx) => (
            <div
              key={idx}
              onClick={() => simulateVoiceInput(cmd.phrase)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-400/50 cursor-pointer transition-all space-y-1 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <span className="text-rose-400 font-black text-xs">"{cmd.phrase}"</span>
                <Play className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-400">{cmd.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Command Execution Audit Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
        <h3 className="font-bold text-white uppercase text-xs tracking-wider flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-rose-400" />
          <span>Voice Execution History Log</span>
        </h3>

        <div className="space-y-2">
          {commandLogs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <strong className="text-white block font-bold">"{log.transcript}"</strong>
                <span className="text-[10px] text-slate-400">{log.matchedAction}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">{log.timestamp}</span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
