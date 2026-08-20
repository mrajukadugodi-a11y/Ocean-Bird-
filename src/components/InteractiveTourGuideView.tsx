import React, { useState } from 'react';
import { Compass, Ship, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Radio, Languages, Gauge, HardDrive, ShieldCheck, Play, HelpCircle, X, Award, Eye } from 'lucide-react';

export interface TourStep {
  stepNumber: number;
  title: string;
  badge: string;
  description: string;
  highlightIcon: React.ElementType;
  targetTabId: string;
  keyFeatures: string[];
}

export const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    title: 'AIS Live Radar & Vessel Tracking Map',
    badge: 'AIS RADAR',
    description: 'Track global maritime vessels in real-time across Malacca Strait, Suez Canal, and Bay of Bengal with satellite telemetry.',
    highlightIcon: Ship,
    targetTabId: 'global-fleet-map',
    keyFeatures: ['Live S-57 Nautical Charts', 'Collision Avoidance CPA/TCPA', 'Storm Swell Overlays']
  },
  {
    stepNumber: 2,
    title: 'Biometric Officer Login & Security',
    badge: 'FIDO2 PASSKEY',
    description: 'Secure STCW watchkeeper access using Touch ID, Face ID, or encrypted WebAuthn hardware security keys.',
    highlightIcon: ShieldCheck,
    targetTabId: 'global-fleet-map',
    keyFeatures: ['Hardware Security Key Support', 'Biometric Officer Identity', 'Session Audit Compliance']
  },
  {
    stepNumber: 3,
    title: 'Voice Activated Bridge Commands',
    badge: 'HANDS-FREE STCW',
    description: 'Issue hands-free voice commands to switch bridge night vision, report engine RPM, or trigger Mayday distress protocols.',
    highlightIcon: Radio,
    targetTabId: 'voice-activated-command',
    keyFeatures: ['Speech Recognition Engine', 'Bridge Voice Shortcuts', 'Audio Feedback Synthesis']
  },
  {
    stepNumber: 4,
    title: 'AI Predictive Equipment Maintenance',
    badge: 'MACHINE LEARNING',
    description: 'Neural network forecasts Remaining Useful Life (RUL) for main engine turbochargers, bearings, and steering gear.',
    highlightIcon: Gauge,
    targetTabId: 'predictive-maintenance',
    keyFeatures: ['Vibration & Temp Diagnostics', 'Automated Work Orders', 'RUL Life Expectancy Charts']
  },
  {
    stepNumber: 5,
    title: 'Multi-Language Maritime Dictionary',
    badge: '8 LANGUAGES',
    description: 'Instant translation of technical STCW phrases and aviation clearance across Hindi, Tamil, Spanish, French, Arabic, Chinese & Japanese.',
    highlightIcon: Languages,
    targetTabId: 'multi-language',
    keyFeatures: ['Native Voice Audio Speech', 'STCW & ICAO Dictionary', 'Language Switcher']
  },
  {
    stepNumber: 6,
    title: 'Offline S-57 Maps & Encrypted Backups',
    badge: 'DISASTER RECOVERY',
    description: 'Store vector charts offline and schedule AES-256 encrypted database snapshots for uninterrupted high-seas operations.',
    highlightIcon: HardDrive,
    targetTabId: 'automated-backup',
    keyFeatures: ['Offline Vector Chart Cache', 'AES-256 JSON Snapshots', 'Cron Backup Schedules']
  }
];

interface InteractiveTourGuideViewProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigateToTab?: (tabId: string) => void;
}

export const InteractiveTourGuideView: React.FC<InteractiveTourGuideViewProps> = ({
  isOpen = true,
  onClose,
  onNavigateToTab
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = TOUR_STEPS[currentStepIndex];
  const StepIcon = currentStep.highlightIcon;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      if (onNavigateToTab) {
        onNavigateToTab(TOUR_STEPS[nextIndex].targetTabId);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      if (onNavigateToTab) {
        onNavigateToTab(TOUR_STEPS[prevIndex].targetTabId);
      }
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    if (onNavigateToTab) {
      onNavigateToTab(TOUR_STEPS[index].targetTabId);
    }
  };

  return (
    <div id="interactive-tour-guide-container" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>INTERACTIVE ONBOARDING TOUR & CAPTAIN'S ORIENTATION GUIDE</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <span>Ocean Bird Interactive Guided Tour</span>
          </h2>
          <p className="text-xs text-slate-400">
            Step-by-step interactive walkthrough highlighting key navigation, AI maintenance, voice commands, and multi-language capabilities.
          </p>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Dots Indicator Bar */}
      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-xs">
        <span className="text-slate-400 font-bold">
          STEP {currentStep.stepNumber} OF {TOUR_STEPS.length}
        </span>
        <div className="flex space-x-2">
          {TOUR_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => handleJumpToStep(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-cyan-400 scale-125 ring-2 ring-cyan-400/50'
                  : idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={step.title}
            />
          ))}
        </div>
        <span className="text-cyan-400 font-bold">{currentStep.badge}</span>
      </div>

      {/* Step Showcase Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 font-mono text-xs relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl text-cyan-300">
              <StepIcon className="w-7 h-7" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold uppercase">
                {currentStep.badge}
              </span>
              <h3 className="text-lg font-black text-white mt-1">{currentStep.title}</h3>
            </div>
          </div>

          <span className="text-4xl font-black text-slate-800">0{currentStep.stepNumber}</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-sans">{currentStep.description}</p>

        {/* Feature Highlights List */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">KEY CAPABILITIES HIGHLIGHTED IN THIS STEP:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentStep.keyFeatures.map((feat, fIdx) => (
              <div key={fIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            disabled={currentStepIndex === 0}
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREVIOUS STEP</span>
          </button>

          {currentStepIndex === TOUR_STEPS.length - 1 ? (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black flex items-center space-x-2 shadow-lg"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>FINISH TOUR & EXPLORE APP</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black flex items-center space-x-2 shadow-lg"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
