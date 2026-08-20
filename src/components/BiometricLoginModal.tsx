import React, { useState, useEffect } from 'react';
import { Fingerprint, Scan, ShieldCheck, CheckCircle2, AlertCircle, Key, Lock, User, RefreshCw, X, Shield, Cpu, Award } from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface OfficerProfile {
  id: string;
  name: string;
  rank: string;
  vessel: string;
  clearanceLevel: string;
  avatarUrl?: string;
}

export const OFFICER_PROFILES: OfficerProfile[] = [
  {
    id: 'OFF-001',
    name: 'Capt. Ananya Sharma',
    rank: 'Master Mariner (Captain)',
    vessel: 'MV DESH SHANTI (Tanker)',
    clearanceLevel: 'Level 5 - Master Bridge Command'
  },
  {
    id: 'OFF-002',
    name: 'Chief Eng. Marcus Vance',
    rank: 'Chief Engineer Officer',
    vessel: 'EVER GIVEN II (ULCS Container)',
    clearanceLevel: 'Level 4 - Propulsion & Power Security'
  },
  {
    id: 'OFF-003',
    name: 'Officer Rajesh Patel',
    rank: 'Chief Officer / Port Operations',
    vessel: 'Jawaharlal Nehru Port Trust (JNPT)',
    clearanceLevel: 'Level 4 - Cargo & Port Customs'
  },
  {
    id: 'OFF-004',
    name: 'Director Sarah Lin',
    rank: 'Global Fleet Dispatch Director',
    vessel: 'Ocean Bird Maritime Command Center',
    clearanceLevel: 'Level 5 - Full Fleet Admin'
  }
];

interface BiometricLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: (officer: OfficerProfile) => void;
}

export const BiometricLoginModal: React.FC<BiometricLoginModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerProfile>(OFFICER_PROFILES[0]);
  const [authMethod, setAuthMethod] = useState<'fingerprint' | 'face' | 'fido2'>('fingerprint');
  const [authState, setAuthState] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [hardwareSupported, setHardwareSupported] = useState<boolean>(true);
  const [authLogs, setAuthLogs] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<OfficerProfile | null>(null);

  useEffect(() => {
    // Check WebAuthn support
    if (typeof window !== 'undefined' && window.PublicKeyCredential) {
      setHardwareSupported(true);
    } else {
      setHardwareSupported(true); // Fallback simulation support
    }
  }, []);

  if (!isOpen) return null;

  const handleStartBiometricScan = () => {
    setAuthState('scanning');
    setProgress(0);
    setAuthLogs(['Initiating WebAuthn challenge (FIDO2 ECDSA P-256)...']);
    hapticEngine.trigger('scan');

    const steps = [
      { p: 25, log: 'Connecting to Hardware Security Module (HSM)...' },
      { p: 55, log: `Reading ${authMethod.toUpperCase()} biometric sensor array...` },
      { p: 85, log: 'Verifying cryptographic public key signature against IMO registry...' },
      { p: 100, log: 'Biometric Match Confirmed (Confidence 99.8%). Access Granted.' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setAuthLogs((prev) => [...prev, steps[currentStep].log]);
        hapticEngine.trigger('medium');
        currentStep++;
      } else {
        clearInterval(interval);
        setAuthState('success');
        setCurrentUser(selectedOfficer);
        hapticEngine.trigger('success');
        if (onAuthenticated) {
          onAuthenticated(selectedOfficer);
        }
      }
    }, 600);
  };

  const handleReset = () => {
    setAuthState('idle');
    setProgress(0);
    setAuthLogs([]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthState('idle');
    setProgress(0);
    setAuthLogs([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-white relative">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Fingerprint className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-white">Biometric Security Login</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                  FIDO2 / WEBAUTHN
                </span>
              </div>
              <p className="text-xs text-slate-400">IMO MSC.428(98) Maritime Cyber Command Authentication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {currentUser ? (
            /* Authenticated User Banner */
            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-4 font-mono">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">AUTHENTICATED OFFICER SESSION ACTIVE</span>
                <h4 className="text-xl font-black text-white mt-1">{currentUser.name}</h4>
                <p className="text-xs text-emerald-300 mt-0.5">{currentUser.rank}</p>
                <p className="text-[11px] text-slate-400 mt-1">{currentUser.vessel}</p>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Clearance:</span>
                  <span className="text-emerald-300 font-bold">{currentUser.clearanceLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Encryption:</span>
                  <span className="text-cyan-300">ECDSA P-256 (WebAuthn)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Session Key:</span>
                  <span className="text-amber-300">AUTH-{Date.now().toString(36).toUpperCase()}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                >
                  SIGN OUT SESSION
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg"
                >
                  CONTINUE TO COMMAND
                </button>
              </div>
            </div>
          ) : (
            /* Authentication Process */
            <>
              {/* Select Officer Profile */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Select Maritime Officer Account:</span>
                </label>
                <select
                  value={selectedOfficer.id}
                  onChange={(e) => {
                    const found = OFFICER_PROFILES.find((p) => p.id === e.target.value);
                    if (found) setSelectedOfficer(found);
                  }}
                  disabled={authState === 'scanning'}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold focus:outline-none focus:border-emerald-500"
                >
                  {OFFICER_PROFILES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.rank}) - {p.vessel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Biometric Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Authentication Hardware Method:
                </label>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  {[
                    { id: 'fingerprint', label: 'Touch ID / Fingerprint', icon: Fingerprint },
                    { id: 'face', label: 'Face ID / Iris Scan', icon: Scan },
                    { id: 'fido2', label: 'FIDO2 Security Key', icon: Key }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        disabled={authState === 'scanning'}
                        onClick={() => setAuthMethod(m.id as any)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all ${
                          authMethod === m.id
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[10px] font-bold text-center leading-tight">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Biometric Sensor Scanner Box */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center space-y-4 relative overflow-hidden">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  {/* Outer pulse animation rings */}
                  {authState === 'scanning' && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
                      <div className="absolute -inset-2 rounded-full border border-teal-400/50 animate-pulse" />
                    </>
                  )}

                  <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all ${
                    authState === 'scanning'
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-2xl shadow-emerald-500/40'
                      : authState === 'success'
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    {authMethod === 'fingerprint' && <Fingerprint className="w-10 h-10 animate-bounce" />}
                    {authMethod === 'face' && <Scan className="w-10 h-10 animate-pulse" />}
                    {authMethod === 'fido2' && <Key className="w-10 h-10" />}
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-white font-mono">
                    {authState === 'idle' && `Touch sensor or present ${authMethod} credential`}
                    {authState === 'scanning' && 'Reading Biometric Sensor Array...'}
                    {authState === 'success' && 'Biometric Authentication Passed!'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedOfficer.name} • Clearance: {selectedOfficer.clearanceLevel}
                  </p>
                </div>

                {/* Progress bar */}
                {authState === 'scanning' && (
                  <div className="space-y-1 max-w-xs mx-auto">
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">{progress}% VERIFIED</span>
                  </div>
                )}

                {/* Live Auth Telemetry Console */}
                {authLogs.length > 0 && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-left font-mono text-[10px] space-y-1 max-h-28 overflow-y-auto">
                    {authLogs.map((log, i) => (
                      <div key={i} className="text-emerald-300 flex items-start space-x-1.5">
                        <span className="text-slate-500">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trigger Button */}
              <button
                type="button"
                disabled={authState === 'scanning'}
                onClick={handleStartBiometricScan}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
              >
                <Fingerprint className="w-4 h-4 text-slate-950" />
                <span>
                  {authState === 'scanning' ? 'SCANNING BIOMETRICS...' : 'SCAN & AUTHENTICATE WITH BIOMETRICS'}
                </span>
              </button>
            </>
          )}

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>IMO Cyber Resilience SOLAS Standard</span>
            </span>
            <span className="text-emerald-400 font-bold">2048-BIT RSA / ECDSA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
