import React, { useState } from 'react';
import { Radio, Volume2, Play, Square, Activity, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface SonarClip {
  id: string;
  name: string;
  frequencyHz: number;
  category: 'ACTIVE_PING' | 'PASSIVE_HYDROPHONE' | 'PROPELLER_CAVITATION' | 'ENGINE_RUMBLE';
  description: string;
}

const SONAR_CLIPS: SonarClip[] = [
  { id: 'SONAR-01', name: 'High-Frequency Active Ping', frequencyHz: 1200, category: 'ACTIVE_PING', description: 'Active echo-ranging sonar ping for subsea distance measurement.' },
  { id: 'SONAR-02', name: 'Low-Frequency Subsea Engine Rumble', frequencyHz: 180, category: 'ENGINE_RUMBLE', description: 'Passive hydrophone pickup of low-RPM shadow tanker diesel engines.' },
  { id: 'SONAR-03', name: 'Skiff Propeller Cavitation Blade Click', frequencyHz: 850, category: 'PROPELLER_CAVITATION', description: 'High-speed twin-outboard propeller cavitation acoustic signature.' }
];

export const SonarSoundClipsView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const playSonarAudio = (clip: SonarClip) => {
    hapticEngine.trigger('click');
    setIsPlaying(clip.id);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = clip.category === 'ACTIVE_PING' ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(clip.frequencyHz, ctx.currentTime);

      if (clip.category === 'ACTIVE_PING') {
        osc.frequency.exponentialRampToValueAtTime(clip.frequencyHz * 0.4, ctx.currentTime + 0.8);
      }

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);

      setTimeout(() => {
        setIsPlaying(null);
      }, 1200);
    } catch {
      setIsPlaying(null);
    }
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
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Acoustic Hydrophone & Active Sonar Sound Clip Synthesizer</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Synthesize and audition subsea acoustic sonar signatures, engine rumbles, and propeller cavitation audio
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          AUDIO ENGINE ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SONAR_CLIPS.map((clip) => (
          <div
            key={clip.id}
            className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <span className="text-[8px] text-cyan-400 font-bold block">{clip.category}</span>
              <h4 className="text-xs font-bold text-white">{clip.name}</h4>
              <p className="text-[9px] text-slate-400 font-sans leading-relaxed">{clip.description}</p>
            </div>

            <button
              onClick={() => playSonarAudio(clip)}
              className={`w-full py-2 rounded-xl text-[10px] font-bold flex items-center justify-center space-x-2 transition-all ${
                isPlaying === clip.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg font-black'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {isPlaying === clip.id ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying === clip.id ? 'PLAYING AUDIO...' : 'PLAY SONAR CLIP'}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
