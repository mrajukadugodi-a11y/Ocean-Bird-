import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Waves,
  Wind,
  CloudRain,
  Sliders,
  Sparkles,
  Radio,
  Anchor,
  Headphones
} from 'lucide-react';

interface SoundscapeTrack {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  freq: number;
  type: 'sine' | 'triangle' | 'sawtooth' | 'white-noise';
  color: string;
}

const SOUNDTRACKS: SoundscapeTrack[] = [
  {
    id: 'deep-ocean-waves',
    name: 'Deep Ocean Swell & Rolling Waves',
    description: 'Low-frequency rhythmic oceanic swell synthesized for off-watch sleep and bridge mental focus.',
    icon: Waves,
    freq: 110,
    type: 'sine',
    color: 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10'
  },
  {
    id: 'coastal-sea-breeze',
    name: 'Monsoon Coastal Sea Breeze',
    description: 'Gentle wind rushing through ship rigging and deck stay wires.',
    icon: Wind,
    freq: 240,
    type: 'triangle',
    color: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
  },
  {
    id: 'night-watch-rain',
    name: 'Night Watch Tropical Rain',
    description: 'Calming tropical rain falling on the wheelhouse roof and sea surface.',
    icon: CloudRain,
    freq: 320,
    type: 'sawtooth',
    color: 'text-purple-400 border-purple-500/50 bg-purple-500/10'
  },
  {
    id: 'hydrophone-whales',
    name: 'Hydrophone Subsea Resonance',
    description: 'Deep ocean acoustic hydrophone hum and gentle sub-bass resonant vibrations.',
    icon: Radio,
    freq: 85,
    type: 'sine',
    color: 'text-amber-400 border-amber-500/50 bg-amber-500/10'
  }
];

export const OceanSoundscapesView: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>('deep-ocean-waves');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);

  // Web Audio Context References
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const startAudio = (trackId: string) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Stop existing oscillator if active
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }

      const track = SOUNDTRACKS.find((t) => t.id === trackId) || SOUNDTRACKS[0];
      const ctx = audioCtxRef.current;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = track.type === 'white-noise' ? 'sine' : track.type;
      osc.frequency.setValueAtTime(track.freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;

      setActiveTrackId(trackId);
      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext initialized or blocked:', e);
    }
  };

  const stopAudio = () => {
    if (oscRef.current) {
      oscRef.current.stop();
      oscRef.current.disconnect();
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else if (activeTrackId) {
      startAudio(activeTrackId);
    }
  };

  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div id="ocean-soundscapes-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Headphones className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>SEAFARERS WELLNESS & OFF-WATCH REST SYNTHESIZER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Waves className="w-6 h-6 text-purple-400" />
              <span>Maritime Ocean Soundscapes</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Synthesized atmospheric ocean acoustics for bridge alertness and crew rest cabin relaxation during extended sea voyages.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className={`px-5 py-3 rounded-xl font-extrabold text-xs shadow-xl flex items-center space-x-2 border transition-all ${
                isPlaying
                  ? 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'PAUSE SOUNDSCAPE' : 'PLAY SOUNDSCAPE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Soundtracks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOUNDTRACKS.map((track) => {
          const IconComp = track.icon;
          const isSelected = activeTrackId === track.id;

          return (
            <div
              key={track.id}
              onClick={() => startAudio(track.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all shadow-xl space-y-3 ${
                isSelected && isPlaying
                  ? 'bg-slate-900 border-purple-500 ring-2 ring-purple-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl border ${track.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{track.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">SYNTHESIZED WEB AUDIO</span>
                  </div>
                </div>

                {isSelected && isPlaying && (
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-[10px] font-mono font-bold animate-pulse">
                    PLAYING
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{track.description}</p>
            </div>
          );
        })}
      </div>

      {/* Audio Master Controls Sidebar Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {volume === 0 ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-purple-400" />}
          <span className="text-slate-300">MASTER VOLUME: {Math.round(volume * 100)}%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="accent-purple-500 bg-slate-950 h-2 rounded-lg cursor-pointer w-32"
          />
        </div>

        <span className="text-slate-500 text-[11px]">
          RECOMMENDED USE: HEADPHONES / WHEELHOUSE AUDIO SYSTEM
        </span>
      </div>
    </div>
  );
};
