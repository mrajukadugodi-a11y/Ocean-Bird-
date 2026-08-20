import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Fingerprint,
  ShieldCheck,
  Key,
  Lock,
  Unlock,
  CheckCircle2,
  RefreshCw,
  UserCheck,
  Building2,
  Ship,
  Globe,
  Database,
  Cpu,
  Check,
  ShieldAlert,
  Sliders,
  Award
} from 'lucide-react';

interface AuthGate {
  id: string;
  provider: string;
  protocol: 'OAuth 2.0 / OIDC' | 'SAML 2.0 Enterprise' | 'FIDO2 / WebAuthn' | 'PKI Digital Certificate';
  clearedRole: string;
  status: 'CONNECTED' | 'VERIFICATION_REQUIRED' | 'DISCONNECTED';
  lastValidated: string;
}

const INITIAL_GATES: AuthGate[] = [
  {
    id: 'GATE-01',
    provider: 'IMO Master Vessel Identity Registry',
    protocol: 'PKI Digital Certificate',
    clearedRole: 'Ship Master (Captain / OOW)',
    status: 'CONNECTED',
    lastValidated: '2026-08-05 02:20 UTC'
  },
  {
    id: 'GATE-02',
    provider: 'Port Authority Customs OAuth2 Federation',
    protocol: 'OAuth 2.0 / OIDC',
    clearedRole: 'Port Customs Clearance Officer',
    status: 'CONNECTED',
    lastValidated: '2026-08-05 01:45 UTC'
  },
  {
    id: 'GATE-03',
    provider: 'STCW Seafarer Biometric Credential Vault',
    protocol: 'FIDO2 / WebAuthn',
    clearedRole: 'Chief Engineer / Electrical Officer',
    status: 'VERIFICATION_REQUIRED',
    lastValidated: '2026-08-04 18:30 UTC'
  },
  {
    id: 'GATE-04',
    provider: 'Global Maritime SAML Enterprise Directory',
    protocol: 'SAML 2.0 Enterprise',
    clearedRole: 'Fleet Superintendent / DPA',
    status: 'CONNECTED',
    lastValidated: '2026-08-05 00:10 UTC'
  }
];

export const IndustryAuthBridgeView: React.FC = () => {
  const [gates, setGates] = useState<AuthGate[]>(INITIAL_GATES);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeRole, setActiveRole] = useState<string>('Ship Master (Captain / OOW)');
  const [passkeyModalOpen, setPasskeyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulatePasskeyAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setPasskeyModalOpen(false);
      setGates((prev) =>
        prev.map((g) => ({
          ...g,
          status: 'CONNECTED',
          lastValidated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
        }))
      );
      showToast('Biometric FIDO2 Passkey challenge verified successfully.');
    }, 1800);
  };

  const handleDisconnectGate = (id: string) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: 'DISCONNECTED' } : g))
    );
    showToast(`Authentication gate ${id} session terminated.`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-cyan-500 text-cyan-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Key className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MARITIME ENTERPRISE SSO & IDENTITY FEDERATION BRIDGE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span>Industry Auth Bridge & Passkey Portal</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Zero-Trust OAuth2/SAML identity federation connecting IMO Master Vessel credentials, Port Customs digital seals, and FIDO2 biometric passkeys.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPasskeyModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-extrabold rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-cyan-950/40"
            >
              <Fingerprint className="w-4 h-4" />
              <span>VERIFY BIOMETRIC PASSKEY</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE IDENTITY & RBAC MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* CURRENT USER IDENTITY CARD (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase border-b border-slate-800 pb-2">
            <UserCheck className="w-4 h-4" />
            <span>Active Authenticated Session</span>
          </div>

          <div className="p-4 bg-slate-950 border border-cyan-500/40 rounded-xl space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-black">
                CAPT
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Capt. Vikramaditya Sharma</h4>
                <p className="text-[10px] text-slate-400">IMO ID: 9823412-MASTER</p>
              </div>
            </div>

            <div className="space-y-1.5 text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-400">Active Role:</span>
                <span className="text-cyan-300 font-bold">{activeRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Level:</span>
                <span className="text-emerald-400 font-bold">Tier 1 - Master Command</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Session Token TTL:</span>
                <span className="text-amber-300 font-bold">07h 42m Remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROLE-BASED ACCESS CONTROL (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4" />
              <span>Role-Based Access Control (RBAC) Switcher</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Switch cleared authorization profile to test clearance boundaries across vessel telemetry, cargo signatures, and customs clearance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Ship Master (Captain / OOW)',
                'Port Customs Clearance Officer',
                'Chief Engineer / Electrical Officer',
                'Fleet Superintendent / DPA'
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role);
                    showToast(`Active RBAC switched to: ${role}`);
                  }}
                  className={`p-3 rounded-xl border text-left font-bold transition-all ${
                    activeRole === role
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-100 shadow-md ring-1 ring-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="block text-xs">{role}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {activeRole === role ? '✓ Active Role' : 'Click to Switch'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEDERATED AUTHENTICATION GATES LIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
            <Database className="w-4 h-4" />
            <span>Federated Identity Gateways ({gates.length} Connected Enclaves)</span>
          </div>

          <span className="text-[10px] text-slate-400">Zero-Trust PKI & OAuth2 Session Bridge</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gates.map((gate) => {
            const isConn = gate.status === 'CONNECTED';
            const isReq = gate.status === 'VERIFICATION_REQUIRED';

            return (
              <div
                key={gate.id}
                className={`p-4 rounded-2xl border space-y-3 bg-slate-950 transition-all ${
                  isConn
                    ? 'border-cyan-500/40 text-cyan-100'
                    : isReq
                    ? 'border-amber-500/50 text-amber-100'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="font-bold text-white text-xs">{gate.provider}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isConn
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : isReq
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {gate.status}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Auth Protocol:</span>
                    <span className="text-cyan-300 font-bold">{gate.protocol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Associated Role:</span>
                    <span className="text-slate-200 font-bold">{gate.clearedRole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Cryptographic Validation:</span>
                    <span className="text-slate-400 font-mono text-[10px]">{gate.lastValidated}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                  <span className="text-[10px] text-slate-500">Gateway ID: {gate.id}</span>
                  {isConn && (
                    <button
                      onClick={() => handleDisconnectGate(gate.id)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-lg text-[10px] transition-all"
                    >
                      Disconnect Token
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BIOMETRIC PASSKEY SIMULATION MODAL */}
      <AnimatePresence>
        {passkeyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl font-mono text-xs space-y-4 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                <Fingerprint className={`w-8 h-8 ${isAuthenticating ? 'animate-pulse text-cyan-300' : ''}`} />
              </div>

              <div>
                <h4 className="text-base font-black text-white">FIDO2 Hardware Passkey</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Touch your security key or present biometric scan to authenticate STCW Credential Vault session.
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-left space-y-1 text-[10px] text-slate-300">
                <div>Relying Party: <strong>auth.oceanbird.maritime</strong></div>
                <div>Challenge Hash: <strong>sha256-e3b0c44298fc1c149afbf4...</strong></div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={handleSimulatePasskeyAuth}
                  disabled={isAuthenticating}
                  className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAuthenticating ? 'VERIFYING...' : 'TOUCH TO AUTHENTICATE'}</span>
                </button>
                <button
                  onClick={() => setPasskeyModalOpen(false)}
                  className="px-3 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
