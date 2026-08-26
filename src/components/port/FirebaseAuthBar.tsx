import React, { useState, useEffect } from 'react';
import {
  User,
  LogOut,
  LogIn,
  Shield,
  Key,
  Mail,
  CheckCircle2,
  Sparkles,
  Award,
  Lock,
  UserPlus,
  RefreshCw,
  Copy,
  AlertCircle
} from 'lucide-react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { hapticEngine } from '../../utils/hapticUtils';

interface FirebaseAuthBarProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const FirebaseAuthBar: React.FC<FirebaseAuthBarProps> = ({ triggerToast }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync user profile record to Firestore
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email || 'anonymous@maritime-portal.io',
              displayName: currentUser.displayName || displayName || 'Captain Visitor',
              role: 'ADMIRAL_SUBSCRIBER',
              loyaltyTier: 'GOLD_ADMIRAL',
              loyaltyPoints: 14250,
              createdAt: new Date().toISOString()
            });
          }
        } catch (err) {
          console.error('Error syncing user doc to firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, [displayName]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!email || !password) {
      setAuthError('Please fill in both email and password.');
      return;
    }

    try {
      if (authMode === 'LOGIN') {
        await signInWithEmailAndPassword(auth, email, password);
        hapticEngine.trigger('success');
        notify('Signed in successfully with Firebase Auth!', 'success', 'AUTHENTICATED');
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        hapticEngine.trigger('success');
        notify('Account created successfully!', 'success', 'ACCOUNT CREATED');
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error(err);
      hapticEngine.trigger('alert');
      setAuthError(err.message || 'Authentication failed.');
    }
  };

  const handleDemoAnonymousSignIn = async () => {
    setAuthError(null);
    try {
      await signInAnonymously(auth);
      hapticEngine.trigger('success');
      notify('Signed in as Guest Captain via Firebase Auth!', 'success', 'GUEST AUTH');
      setShowAuthModal(false);
    } catch (err: any) {
      console.error(err);
      hapticEngine.trigger('alert');
      setAuthError(err.message || 'Anonymous sign in failed.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      hapticEngine.trigger('click');
      notify('Signed out of Firebase Auth.', 'info', 'SIGNED OUT');
    } catch (err: any) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center space-x-2 text-xs font-mono text-slate-400">
        <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
        <span>Initializing Firebase Authentication...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white font-mono">
                {user ? user.email || `Guest UID: ${user.uid.slice(0, 8)}...` : 'Not Signed In'}
              </span>
              {user && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>FIREBASE VERIFIED</span>
                </span>
              )}
            </div>

            <p className="text-[11px] font-mono text-slate-400">
              {user
                ? `Role: Captain Admiral Subscriber • UID: ${user.uid}`
                : 'Sign in to persist your duty-free receipts, saved leads, and loyalty points'}
            </p>
          </div>
        </div>

        <div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-rose-400 font-mono text-xs border border-slate-800 flex items-center space-x-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all flex items-center space-x-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Firebase Login / Sign Up</span>
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-cyan-500/50 p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Firebase Authentication Portal</h3>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Auth Mode Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setAuthMode('LOGIN')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  authMode === 'LOGIN' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('REGISTER')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  authMode === 'REGISTER' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Register Account
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {authMode === 'REGISTER' && (
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">FULL NAME / CAPTAIN TITLE</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Captain Ananya Silva"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="captain@maritime-portal.io"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">PASSWORD</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all"
              >
                {authMode === 'LOGIN' ? 'Sign In with Email' : 'Create New Account'}
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-slate-500 font-mono text-[10px]">OR INSTANT DEMO</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <button
              onClick={handleDemoAnonymousSignIn}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Instant Guest Login (Demo)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
