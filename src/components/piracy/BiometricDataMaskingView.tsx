import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Key, RefreshCw, UserCheck } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MaskedCrewBiometric {
  id: string;
  rawName: string;
  maskedHash: string;
  heartRateBpm: number;
  stressIndexPct: number;
  gdprStatus: 'ENCRYPTED & MASKED' | 'EXPOSED';
}

const SAMPLE_BIOMETRICS: MaskedCrewBiometric[] = [
  {
    id: 'CREW-01',
    rawName: 'Capt. A. Lindqvist',
    maskedHash: 'a8f9c2d1***e718b (Officer #104)',
    heartRateBpm: 74,
    stressIndexPct: 28,
    gdprStatus: 'ENCRYPTED & MASKED'
  },
  {
    id: 'CREW-02',
    rawName: 'Chief Officer M. Kowalski',
    maskedHash: '3b11c900***f4201 (Officer #209)',
    heartRateBpm: 88,
    stressIndexPct: 62,
    gdprStatus: 'ENCRYPTED & MASKED'
  },
  {
    id: 'CREW-03',
    rawName: '2nd Mate S. Thorne',
    maskedHash: 'f49901aa***d8311 (Officer #312)',
    heartRateBpm: 68,
    stressIndexPct: 18,
    gdprStatus: 'ENCRYPTED & MASKED'
  }
];

export const BiometricDataMaskingView: React.FC = () => {
  const [isMaskingEnabled, setIsMaskingEnabled] = useState<boolean>(true);

  const toggleMasking = () => {
    hapticEngine.trigger('click');
    setIsMaskingEnabled((prev) => !prev);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>GDPR Crew Biometric Privacy Vault & SHA-256 Hash Masking</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Automated encryption and zero-knowledge hash masking for crew cardiac, stress, and sleep biometric telemetry
          </p>
        </div>

        <button
          onClick={toggleMasking}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            isMaskingEnabled
              ? 'bg-emerald-500 text-slate-950 font-black shadow'
              : 'bg-rose-950 text-rose-300 border border-rose-800'
          }`}
        >
          {isMaskingEnabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{isMaskingEnabled ? 'BIOMETRIC MASKING ACTIVE' : 'UNMASKED (AUDIT ONLY)'}</span>
        </button>
      </div>

      {/* Biometric Privacy Stream Table */}
      <div className="space-y-2">
        {SAMPLE_BIOMETRICS.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 font-bold block">{item.id}</span>
              <span className="text-xs font-bold text-white block">
                {isMaskingEnabled ? item.maskedHash : item.rawName}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[10px]">
              <div className="text-right">
                <span className="text-slate-400 block">Heart Rate:</span>
                <span className="text-cyan-300 font-bold block">{item.heartRateBpm} BPM</span>
              </div>

              <div className="text-right">
                <span className="text-slate-400 block">Stress Level:</span>
                <span className="text-amber-400 font-bold block">{item.stressIndexPct}%</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                  isMaskingEnabled
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-rose-950 text-rose-300 border-rose-800'
                }`}
              >
                {isMaskingEnabled ? 'GDPR MASKED' : 'UNENCRYPTED'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
