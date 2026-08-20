import React, { useState } from 'react';
import { Eye, HelpCircle, X, CheckCircle2, Shield, Layers, Navigation, Info, ArrowRight } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ARHelpOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ARHelpOverlayModal: React.FC<ARHelpOverlayModalProps> = ({ isOpen, onClose }) => {
  const [activeHelpStep, setActiveHelpStep] = useState<number>(1);

  if (!isOpen) return null;

  const HELP_STEPS = [
    {
      step: 1,
      title: 'AR Spatial Calibration & Headset Pairing',
      description: 'Align the central reticle with the vessel superstructure bridge origin point to sync spatial AR nodes.'
    },
    {
      step: 2,
      title: 'Watertight Bulkhead & Door Seal Telemetry',
      description: 'Look at any heavy steel door to trigger 210 BAR hydraulic seal diagnostics and lock status.'
    },
    {
      step: 3,
      title: 'Citadel Air Scrubber & Oxygen HUD',
      description: 'Monitor live O2 levels (nominal 21.0%) and carbon dioxide air scrubber pressure inside the citadel.'
    },
    {
      step: 4,
      title: 'Perimeter Razor Wire Electrical Status',
      description: 'Verify 240V electrification and micro-vibration intrusion alerts along deck handrails.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">AR HUD Spatial Operator Guide</h3>
          </div>
          <button
            onClick={() => {
              hapticEngine.trigger('click');
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Step {activeHelpStep} of 4:</span>
              <span className="text-xs font-bold text-white">{HELP_STEPS[activeHelpStep - 1].title}</span>
            </div>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              {HELP_STEPS[activeHelpStep - 1].description}
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setActiveHelpStep((prev) => Math.max(1, prev - 1));
                hapticEngine.trigger('click');
              }}
              disabled={activeHelpStep === 1}
              className="px-3 py-1.5 bg-slate-950 disabled:opacity-40 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold"
            >
              PREVIOUS
            </button>

            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeHelpStep === num ? 'bg-cyan-400' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {activeHelpStep < 4 ? (
              <button
                onClick={() => {
                  setActiveHelpStep((prev) => Math.min(4, prev + 1));
                  hapticEngine.trigger('click');
                }}
                className="px-3.5 py-1.5 bg-cyan-500 text-slate-950 rounded-xl text-xs font-black shadow"
              >
                NEXT STEP
              </button>
            ) : (
              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  onClose();
                }}
                className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 rounded-xl text-xs font-black shadow"
              >
                DISMISS GUIDE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
