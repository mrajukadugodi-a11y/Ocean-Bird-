import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Radio, Zap, Shield, CheckCircle2, AlertOctagon, RefreshCw } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { maritimeAlarmSynth } from '../MarinePiracyAlertView';

export interface VoiceCommandLog {
  id: string;
  timestamp: string;
  commandText: string;
  actionTaken: string;
  status: 'EXECUTED' | 'CONFIRMED';
}

export const VoiceWorkflowAutomationView: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [simulatedTranscript, setSimulatedTranscript] = useState<string>('');
  const [commandLogs, setCommandLogs] = useState<VoiceCommandLog[]>([
    {
      id: 'LOG-01',
      timestamp: '03:42:10 UTC',
      commandText: '"SOUND GENERAL EMERGENCY SIREN"',
      actionTaken: 'Bridge Siren Triggered @ 110 dB',
      status: 'EXECUTED'
    },
    {
      id: 'LOG-02',
      timestamp: '03:42:25 UTC',
      commandText: '"PRESSURIZE PORT WATER CANNONS"',
      actionTaken: 'Water Pump #1 Engaged (14 BAR)',
      status: 'EXECUTED'
    }
  ]);

  const speakVoiceConfirmation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleExecuteVoiceCommand = (command: string, action: string) => {
    hapticEngine.trigger('alert');
    setSimulatedTranscript(command);
    
    if (command.includes('ALARM') || command.includes('EMERGENCY')) {
      maritimeAlarmSynth.playEmergencySiren(2000);
    }

    speakVoiceConfirmation(`Voice Command Confirmed: ${action}`);

    const newLog: VoiceCommandLog = {
      id: `LOG-0${commandLogs.length + 1}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      commandText: `"${command.toUpperCase()}"`,
      actionTaken: action,
      status: 'EXECUTED'
    };

    setCommandLogs([newLog, ...commandLogs]);
  };

  const toggleListeningMode = () => {
    hapticEngine.trigger('click');
    setIsListening(!isListening);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Mic className="w-4 h-4 text-cyan-400" />
            <span>Voice Command Hands-Free Bridge Emergency Automation Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Hands-free voice recognition matrix allowing bridge officers to trigger critical defenses under pressure
          </p>
        </div>

        <button
          onClick={toggleListeningMode}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
            isListening
              ? 'bg-rose-500 text-slate-950 border-rose-400 font-black animate-pulse'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          <span>{isListening ? 'VOICE LISTENING: ACTIVE' : 'ENABLE VOICE RECOGNITION'}</span>
        </button>
      </div>

      {/* Quick Voice Command Action Buttons */}
      <div className="space-y-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">Trigger Sample Bridge Voice Commands:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => handleExecuteVoiceCommand('Sound General Emergency Alarm', 'Activated Bridge Siren & Crew Alarms')}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-rose-500 rounded-2xl text-left space-y-0.5 transition-all group"
          >
            <span className="text-xs font-bold text-white group-hover:text-rose-400 block">"Sound General Emergency Alarm"</span>
            <span className="text-[9px] text-slate-500 block font-sans">Triggers 110 dB audible siren & deck strobe lights</span>
          </button>

          <button
            onClick={() => handleExecuteVoiceCommand('Lock Citadel Doors', 'Executed Citadel Motorized Bolt Lockout')}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 rounded-2xl text-left space-y-0.5 transition-all group"
          >
            <span className="text-xs font-bold text-white group-hover:text-cyan-400 block">"Lock Citadel Armored Doors"</span>
            <span className="text-[9px] text-slate-500 block font-sans">Seals heavy steel citadel doors and cuts engine room access</span>
          </button>

          <button
            onClick={() => handleExecuteVoiceCommand('Deploy Water Monitors', 'Pressurized Starboard & Port Water Cannons to 14 BAR')}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 rounded-2xl text-left space-y-0.5 transition-all group"
          >
            <span className="text-xs font-bold text-white group-hover:text-emerald-400 block">"Deploy Deck Water Cannons"</span>
            <span className="text-[9px] text-slate-500 block font-sans">Engages high-pressure pumps to repel boarding skiffs</span>
          </button>

          <button
            onClick={() => handleExecuteVoiceCommand('Transmit Mayday VHF Channel 16', 'Broadcast Mayday Distress Alert on VHF CH 16')}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 rounded-2xl text-left space-y-0.5 transition-all group"
          >
            <span className="text-xs font-bold text-white group-hover:text-amber-400 block">"Transmit Mayday VHF CH 16"</span>
            <span className="text-[9px] text-slate-500 block font-sans">Broadcasts automated distress position to naval coalition forces</span>
          </button>
        </div>
      </div>

      {/* Voice Executed History Logs */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <span className="text-[10px] text-cyan-300 font-bold uppercase block">Executed Voice Command Logs:</span>
        <div className="space-y-1.5">
          {commandLogs.map((log) => (
            <div key={log.id} className="flex justify-between items-center text-[10px] bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
              <div className="space-x-2">
                <span className="text-slate-500 font-bold">{log.timestamp}</span>
                <span className="text-white font-bold">{log.commandText}</span>
              </div>
              <span className="text-emerald-400 font-bold">{log.actionTaken}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
