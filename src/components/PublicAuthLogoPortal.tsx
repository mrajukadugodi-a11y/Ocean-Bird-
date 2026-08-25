import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  LogIn,
  User,
  ShieldCheck,
  Globe,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Key,
  Mail,
  Lock,
  Building,
  Anchor,
  Compass,
  Ship,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  LogOut,
  Edit3,
  RefreshCw,
  X,
  FileCheck,
  Award,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Check,
  Upload,
  Layers,
  Wand2,
  Palette,
  Type,
  Maximize2,
  Send,
  Smartphone,
  Info,
  Clock,
  KeyRound,
  FileText,
  Trash2,
  HelpCircle,
  ArrowRight,
  Shield,
  CheckSquare
} from 'lucide-react';
import oceanBirdLogo from '../assets/images/ocean_bird_logo_1785499834795.jpg';
import { hapticEngine } from '../utils/hapticUtils';

export interface PublicUserAccount {
  id: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  role: 'Captain / Deck Officer' | 'Ocean Engineer' | 'Fleet Operator' | 'Airways Passenger' | 'Public Citizen' | 'Maritime Trainee';
  organization: string;
  country: string;
  bio?: string;
  phone?: string;
  avatarLogoUrl: string;
  registeredDate: string;
  accountTier: 'Public Member' | 'Verified Seafarer' | 'Executive Engineer';
  securityClearance: 'Level-1 Public' | 'Level-2 Seafarer' | 'Level-3 Master Operator';
  apiKey?: string;
  twoFactorEnabled?: boolean;
  oauthProvider?: 'google' | 'github' | 'microsoft' | 'apple' | 'linkedin';
}

export interface GeneratedBrandLogo {
  id: string;
  brandName: string;
  subtitle: string;
  iconShape: 'bird' | 'anchor' | 'compass' | 'wave' | 'ship' | 'trident' | 'shield' | 'atom';
  layoutShape: 'circle' | 'square' | 'hexagon' | 'badge';
  colorTheme: 'cyan' | 'emerald' | 'gold' | 'purple' | 'silver';
  fontStyle: 'bold' | 'tech' | 'futuristic' | 'classic';
  svgString: string;
  createdDate: string;
}

interface PublicAuthLogoPortalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signup' | 'signin' | 'profile' | 'logo-generator' | 'brand-press';
  onAccountUpdate?: (user: PublicUserAccount | null) => void;
}

// Helper Email Regex Validator
export const validateEmailSyntax = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const PublicAuthLogoPortal: React.FC<PublicAuthLogoPortalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signup',
  onAccountUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'signup' | 'signin' | 'profile' | 'logo-generator' | 'brand-press'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<PublicUserAccount | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Email Validation & OTP State
  const [otpSentCode, setOtpSentCode] = useState<string | null>(null);
  const [userOtpInput, setUserOtpInput] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailValidationStatus, setEmailValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Password Reset Flow State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetStep, setResetStep] = useState<'request' | 'verify' | 'newpass' | 'success'>('request');
  const [resetEmailInput, setResetEmailInput] = useState('');
  const [resetSentPin, setResetSentPin] = useState<string | null>(null);
  const [resetPinInput, setResetPinInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');

  // OAuth State
  const [oauthLoadingProvider, setOauthLoadingProvider] = useState<string | null>(null);

  // Account Deletion State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Public Citizen' as PublicUserAccount['role'],
    organization: 'Global Maritime Community',
    country: 'United States',
    phone: '',
    bio: 'Passionate about ocean science and maritime navigation.',
    avatarLogoUrl: oceanBirdLogo,
    agreeTerms: true
  });

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState<Partial<PublicUserAccount>>({});

  // Brand Logo Generator Tool State
  const [generatorState, setGeneratorState] = useState({
    brandName: 'OCEAN BIRD',
    subtitle: 'EASTMAN CREATION',
    iconShape: 'bird' as GeneratedBrandLogo['iconShape'],
    layoutShape: 'badge' as GeneratedBrandLogo['layoutShape'],
    colorTheme: 'cyan' as GeneratedBrandLogo['colorTheme'],
    fontStyle: 'bold' as GeneratedBrandLogo['fontStyle'],
    glowIntensity: 15,
    borderWidth: 4
  });

  const [mySavedLogos, setMySavedLogos] = useState<GeneratedBrandLogo[]>([]);

  // Load existing user account & saved logos on mount
  useEffect(() => {
    const saved = localStorage.getItem('oceanbird_public_user_account');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        setEditProfileData(parsed);
      } catch (err) {
        console.error('Failed to parse user account', err);
      }
    }

    const savedLogos = localStorage.getItem('oceanbird_user_generated_logos');
    if (savedLogos) {
      try {
        setMySavedLogos(JSON.parse(savedLogos));
      } catch (err) {
        console.error('Failed to parse saved logos', err);
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (defaultTab === 'signup' || defaultTab === 'signin') {
        setActiveTab('profile');
      } else {
        setActiveTab(defaultTab);
      }
    } else {
      if (defaultTab === 'profile') {
        setActiveTab('signup');
      } else {
        setActiveTab(defaultTab);
      }
    }
  }, [isOpen, defaultTab, currentUser]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Live Email Validation Change
  const handleSignUpEmailChange = (emailVal: string) => {
    setSignUpData(prev => ({ ...prev, email: emailVal }));
    if (!emailVal.trim()) {
      setEmailValidationStatus('idle');
    } else if (validateEmailSyntax(emailVal)) {
      setEmailValidationStatus('valid');
    } else {
      setEmailValidationStatus('invalid');
    }
  };

  // Generate 6-Digit OTP Email Code
  const handleSendOtp = () => {
    if (!validateEmailSyntax(signUpData.email)) {
      showToast('Please enter a valid email address first.');
      return;
    }

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpSentCode(generatedCode);
    setShowOtpModal(true);
    hapticEngine.trigger('success');
    showToast(`Verification OTP Code sent to ${signUpData.email}!`);
  };

  const handleVerifyOtp = () => {
    if (userOtpInput.trim() === otpSentCode) {
      hapticEngine.trigger('success');
      setShowOtpModal(false);
      showToast('Email address verified successfully!');
      if (currentUser) {
        const updated = { ...currentUser, isEmailVerified: true };
        setCurrentUser(updated);
        localStorage.setItem('oceanbird_public_user_account', JSON.stringify(updated));
        if (onAccountUpdate) onAccountUpdate(updated);
      }
    } else {
      hapticEngine.trigger('heavy');
      showToast('Invalid OTP Verification Code! Please check the simulated inbox.');
    }
  };

  // OAuth Provider Authentication Simulator
  const handleOAuthLogin = (provider: 'google' | 'github' | 'microsoft' | 'apple' | 'linkedin') => {
    hapticEngine.trigger('click');
    setOauthLoadingProvider(provider);

    setTimeout(() => {
      hapticEngine.trigger('success');
      setOauthLoadingProvider(null);

      const providerNames: Record<string, string> = {
        google: 'Google',
        github: 'GitHub',
        microsoft: 'Microsoft',
        apple: 'Apple ID',
        linkedin: 'LinkedIn'
      };

      const mockEmail = `user.${provider}@maritime-hub.org`;
      const mockName = `${providerNames[provider]} Authenticated User`;

      const oauthAccount: PublicUserAccount = {
        id: `OB-${provider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: mockName,
        email: mockEmail,
        isEmailVerified: true,
        role: 'Public Citizen',
        organization: `${providerNames[provider]} Federated Identity`,
        country: 'Global',
        phone: '+1 (800) 555-0199',
        bio: `Authenticated via ${providerNames[provider]} Single Sign-On (SSO) OAuth 2.0.`,
        avatarLogoUrl: oceanBirdLogo,
        registeredDate: new Date().toISOString().split('T')[0],
        accountTier: 'Public Member',
        securityClearance: 'Level-1 Public',
        apiKey: `OB_${provider.toUpperCase()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        twoFactorEnabled: true,
        oauthProvider: provider
      };

      localStorage.setItem('oceanbird_public_user_account', JSON.stringify(oauthAccount));
      setCurrentUser(oauthAccount);
      setEditProfileData(oauthAccount);
      if (onAccountUpdate) onAccountUpdate(oauthAccount);
      window.dispatchEvent(new Event('oceanbird_auth_changed'));

      showToast(`Successfully authenticated with ${providerNames[provider]} OAuth!`);
      setActiveTab('profile');
    }, 1200);
  };

  // Password Reset Handlers
  const handleRequestPasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailSyntax(resetEmailInput)) {
      showToast('Please enter a valid email address.');
      return;
    }

    hapticEngine.trigger('success');
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setResetSentPin(pin);
    setResetStep('verify');
    showToast(`Password reset code sent to ${resetEmailInput}!`);
  };

  const handleVerifyResetPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPinInput.trim() === resetSentPin) {
      hapticEngine.trigger('success');
      setResetStep('newpass');
      showToast('PIN verified! Enter your new password.');
    } else {
      hapticEngine.trigger('heavy');
      showToast('Incorrect reset PIN code.');
    }
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }
    if (newPasswordInput !== confirmNewPasswordInput) {
      showToast('Passwords do not match.');
      return;
    }

    hapticEngine.trigger('success');
    setResetStep('success');
    showToast('Password reset successfully! You can now sign in.');
  };

  // Handle Signup
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('success');

    if (!signUpData.fullName || !signUpData.email || !signUpData.password) {
      showToast('Please fill in all required fields.');
      return;
    }

    if (!validateEmailSyntax(signUpData.email)) {
      showToast('Invalid email format. Please check your email address.');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      showToast('Passwords do not match! Please verify.');
      return;
    }

    const newAccount: PublicUserAccount = {
      id: `OB-PASSPORT-${Date.now().toString().slice(-6)}`,
      fullName: signUpData.fullName,
      email: signUpData.email,
      isEmailVerified: userOtpInput.trim() === otpSentCode,
      role: signUpData.role,
      organization: signUpData.organization || 'Global Maritime Community',
      country: signUpData.country || 'Global',
      phone: signUpData.phone || '+1 (555) 019-2831',
      bio: signUpData.bio || 'Maritime enthusiast and ocean science professional.',
      avatarLogoUrl: signUpData.avatarLogoUrl || oceanBirdLogo,
      registeredDate: new Date().toISOString().split('T')[0],
      accountTier: signUpData.role.includes('Captain') || signUpData.role.includes('Engineer')
        ? 'Verified Seafarer'
        : 'Public Member',
      securityClearance: signUpData.role.includes('Operator')
        ? 'Level-3 Master Operator'
        : signUpData.role.includes('Captain') || signUpData.role.includes('Engineer')
        ? 'Level-2 Seafarer'
        : 'Level-1 Public',
      apiKey: `OB_LIVE_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      twoFactorEnabled: false
    };

    localStorage.setItem('oceanbird_public_user_account', JSON.stringify(newAccount));
    setCurrentUser(newAccount);
    setEditProfileData(newAccount);
    if (onAccountUpdate) onAccountUpdate(newAccount);
    window.dispatchEvent(new Event('oceanbird_auth_changed'));

    showToast(`Welcome ${newAccount.fullName}! Account created and authenticated.`);
    setActiveTab('profile');
  };

  // Handle Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('success');

    if (!signInData.email) {
      showToast('Please enter your email address.');
      return;
    }

    if (!validateEmailSyntax(signInData.email)) {
      showToast('Invalid email address format.');
      return;
    }

    const existingStr = localStorage.getItem('oceanbird_public_user_account');
    let accountToSet: PublicUserAccount;

    if (existingStr) {
      accountToSet = JSON.parse(existingStr);
      accountToSet.email = signInData.email;
    } else {
      accountToSet = {
        id: `OB-PASSPORT-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: signInData.email.split('@')[0].toUpperCase(),
        email: signInData.email,
        isEmailVerified: true,
        role: 'Public Citizen',
        organization: 'Ocean Bird Member',
        country: 'Global Citizen',
        phone: '+1 (555) 890-1234',
        bio: 'Authenticated Ocean Bird user profile.',
        avatarLogoUrl: oceanBirdLogo,
        registeredDate: new Date().toISOString().split('T')[0],
        accountTier: 'Public Member',
        securityClearance: 'Level-1 Public',
        apiKey: `OB_LIVE_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
        twoFactorEnabled: false
      };
    }

    localStorage.setItem('oceanbird_public_user_account', JSON.stringify(accountToSet));
    setCurrentUser(accountToSet);
    setEditProfileData(accountToSet);
    if (onAccountUpdate) onAccountUpdate(accountToSet);
    window.dispatchEvent(new Event('oceanbird_auth_changed'));

    showToast(`Signed in successfully as ${accountToSet.fullName}`);
    setActiveTab('profile');
  };

  // Handle Profile Save
  const handleSaveProfile = () => {
    if (!currentUser) return;
    hapticEngine.trigger('success');

    if (editProfileData.email && !validateEmailSyntax(editProfileData.email)) {
      showToast('Invalid email syntax in profile.');
      return;
    }

    const updated = {
      ...currentUser,
      ...editProfileData
    } as PublicUserAccount;

    setCurrentUser(updated);
    localStorage.setItem('oceanbird_public_user_account', JSON.stringify(updated));
    if (onAccountUpdate) onAccountUpdate(updated);
    window.dispatchEvent(new Event('oceanbird_auth_changed'));
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
  };

  // Handle Sign Out
  const handleSignOut = () => {
    hapticEngine.trigger('heavy');
    localStorage.removeItem('oceanbird_public_user_account');
    setCurrentUser(null);
    if (onAccountUpdate) onAccountUpdate(null);
    window.dispatchEvent(new Event('oceanbird_auth_changed'));
    showToast('Signed out of session.');
    setActiveTab('signup');
  };

  // Handle Permanent Account Deletion
  const handleDeleteAccount = () => {
    if (deleteConfirmationInput.trim().toUpperCase() !== 'DELETE') {
      showToast('Type DELETE in all caps to confirm deletion.');
      return;
    }

    hapticEngine.trigger('heavy');
    localStorage.removeItem('oceanbird_public_user_account');
    localStorage.removeItem('oceanbird_user_generated_logos');
    setCurrentUser(null);
    setMySavedLogos([]);
    setShowDeleteModal(false);
    setDeleteConfirmationInput('');

    if (onAccountUpdate) onAccountUpdate(null);
    window.dispatchEvent(new Event('oceanbird_auth_changed'));

    showToast('Your account and all associated saved data have been deleted permanently.');
    setActiveTab('signup');
  };

  // Generate SVG Code String for Brand Logo Generator
  const generateLogoSvgString = () => {
    const { brandName, subtitle, iconShape, layoutShape, colorTheme, fontStyle } = generatorState;

    let themePrimary = '#06b6d4';
    let themeSecondary = '#3b82f6';
    let themeAccent = '#10b981';

    if (colorTheme === 'emerald') {
      themePrimary = '#10b981';
      themeSecondary = '#059669';
      themeAccent = '#f59e0b';
    } else if (colorTheme === 'gold') {
      themePrimary = '#f59e0b';
      themeSecondary = '#d97706';
      themeAccent = '#ec4899';
    } else if (colorTheme === 'purple') {
      themePrimary = '#a855f7';
      themeSecondary = '#6366f1';
      themeAccent = '#06b6d4';
    } else if (colorTheme === 'silver') {
      themePrimary = '#e2e8f0';
      themeSecondary = '#94a3b8';
      themeAccent = '#38bdf8';
    }

    let iconD = 'M 120 280 C 180 180, 280 140, 390 120 C 340 220, 280 260, 200 290 Z';
    if (iconShape === 'anchor') {
      iconD = 'M 256 120 L 256 360 M 180 240 L 332 240 M 160 320 C 180 400, 332 400, 352 320';
    } else if (iconShape === 'compass') {
      iconD = 'M 256 120 L 290 230 L 392 256 L 290 282 L 256 392 L 222 282 L 120 256 L 222 230 Z';
    } else if (iconShape === 'wave') {
      iconD = 'M 100 280 Q 180 200, 256 280 T 412 280 M 100 330 Q 180 250, 256 330 T 412 330';
    } else if (iconShape === 'trident') {
      iconD = 'M 256 100 L 256 400 M 180 140 L 180 260 C 180 300, 332 300, 332 260 L 332 140';
    } else if (iconShape === 'atom') {
      iconD = 'M 256 256 m -120 0 a 120 60 0 1 0 240 0 a 120 60 0 1 0 -240 0 M 256 256 m -120 0 a 60 120 0 1 0 240 0 a 60 120 0 1 0 -240 0';
    }

    let shapeBorder = `<rect width="512" height="512" rx="100" fill="#020617" stroke="${themePrimary}" stroke-width="8"/>`;
    if (layoutShape === 'circle') {
      shapeBorder = `<circle cx="256" cy="256" r="240" fill="#020617" stroke="${themePrimary}" stroke-width="8"/>`;
    } else if (layoutShape === 'hexagon') {
      shapeBorder = `<polygon points="256 16, 480 128, 480 384, 256 496, 32 384, 32 128" fill="#020617" stroke="${themePrimary}" stroke-width="8"/>`;
    }

    let fontFamily = 'Montserrat, sans-serif';
    if (fontStyle === 'tech') fontFamily = 'Courier New, monospace';
    if (fontStyle === 'futuristic') fontFamily = 'Orbitron, sans-serif';
    if (fontStyle === 'classic') fontFamily = 'Georgia, serif';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${themePrimary}"/>
      <stop offset="50%" stop-color="${themeSecondary}"/>
      <stop offset="100%" stop-color="${themeAccent}"/>
    </linearGradient>
  </defs>
  ${shapeBorder}
  <path d="${iconD}" fill="none" stroke="url(#brandGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="256" cy="256" r="12" fill="${themeAccent}"/>
  <text x="256" y="420" font-family="${fontFamily}" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="3">${brandName.toUpperCase()}</text>
  <text x="256" y="450" font-family="sans-serif" font-size="14" font-weight="700" fill="${themePrimary}" text-anchor="middle">${subtitle.toUpperCase()}</text>
</svg>`;
  };

  // Save Generated Logo
  const handleSaveGeneratedLogo = () => {
    hapticEngine.trigger('success');
    const svgStr = generateLogoSvgString();
    const newLogo: GeneratedBrandLogo = {
      id: `LOGO-${Date.now().toString().slice(-6)}`,
      brandName: generatorState.brandName,
      subtitle: generatorState.subtitle,
      iconShape: generatorState.iconShape,
      layoutShape: generatorState.layoutShape,
      colorTheme: generatorState.colorTheme,
      fontStyle: generatorState.fontStyle,
      svgString: svgStr,
      createdDate: new Date().toISOString().split('T')[0]
    };

    const updatedLogos = [newLogo, ...mySavedLogos];
    setMySavedLogos(updatedLogos);
    localStorage.setItem('oceanbird_user_generated_logos', JSON.stringify(updatedLogos));
    showToast(`Brand logo "${newLogo.brandName}" saved to your profile gallery!`);
  };

  // Download Generated SVG
  const handleDownloadGeneratedLogo = () => {
    hapticEngine.trigger('heavy');
    const svgStr = generateLogoSvgString();
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatorState.brandName.toLowerCase().replace(/\s+/g, '_')}_logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded vector SVG logo file!');
  };

  // Set Generated Logo as Profile Avatar
  const handleSetLogoAsAvatar = () => {
    if (!currentUser) {
      showToast('Please sign in or sign up to save avatar to profile.');
      return;
    }
    hapticEngine.trigger('success');
    const svgStr = generateLogoSvgString();
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const dataUrl = URL.createObjectURL(blob);

    const updatedUser = { ...currentUser, avatarLogoUrl: dataUrl };
    setCurrentUser(updatedUser);
    localStorage.setItem('oceanbird_public_user_account', JSON.stringify(updatedUser));
    if (onAccountUpdate) onAccountUpdate(updatedUser);
    window.dispatchEvent(new Event('oceanbird_auth_changed'));
    showToast('Set generated logo as your account avatar!');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[200] bg-cyan-400 text-slate-950 font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 border border-cyan-200 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950 shrink-0" />
          <span className="text-xs">{toastMessage}</span>
        </div>
      )}

      {/* Simulated Email Verification OTP Inbox Popup */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <h3 className="font-black text-sm text-cyan-300 uppercase">Simulated Email OTP Verification</h3>
              </div>
              <button onClick={() => setShowOtpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>From: security@oceanbird.org</span>
                <span>Just Now</span>
              </div>
              <div className="text-xs font-bold text-white">To: {signUpData.email}</div>
              <p className="text-xs text-slate-300">
                Your 6-digit authentication verification security pin is:
              </p>
              <div className="p-3 bg-cyan-500/20 border border-cyan-400 text-center font-mono font-black text-2xl tracking-widest text-cyan-300 rounded-xl">
                {otpSentCode}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Enter 6-Digit Verification Pin *</label>
              <input
                type="text"
                value={userOtpInput}
                onChange={(e) => setUserOtpInput(e.target.value)}
                placeholder="e.g. 582914"
                maxLength={6}
                className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-4 py-2.5 text-center font-mono font-black text-lg text-white focus:outline-none"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setShowOtpModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg"
              >
                Verify & Activate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-indigo-400" />
                <h3 className="font-black text-sm text-indigo-300 uppercase">Password Reset Flow</h3>
              </div>
              <button
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetStep('request');
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetStep === 'request' && (
              <form onSubmit={handleRequestPasswordReset} className="space-y-4 text-xs">
                <p className="text-slate-300">
                  Enter your account email address. We will send a 6-digit security reset PIN code to recover your account.
                </p>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Account Email *</label>
                  <input
                    type="email"
                    value={resetEmailInput}
                    onChange={(e) => setResetEmailInput(e.target.value)}
                    placeholder="e.g. captain@oceanbird.org"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl uppercase tracking-wider"
                >
                  Send Reset Code
                </button>
              </form>
            )}

            {resetStep === 'verify' && (
              <form onSubmit={handleVerifyResetPin} className="space-y-4 text-xs">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300">
                  Reset code sent to <span className="font-bold">{resetEmailInput}</span>. (Simulated PIN code: <span className="font-mono font-bold text-white">{resetSentPin}</span>)
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Enter 6-Digit Reset PIN *</label>
                  <input
                    type="text"
                    value={resetPinInput}
                    onChange={(e) => setResetPinInput(e.target.value)}
                    placeholder="e.g. 829104"
                    maxLength={6}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center font-mono text-lg text-white focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl uppercase tracking-wider"
                >
                  Verify Reset Code
                </button>
              </form>
            )}

            {resetStep === 'newpass' && (
              <form onSubmit={handleSaveNewPassword} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">New Password *</label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300 block">Confirm New Password *</label>
                  <input
                    type="password"
                    value={confirmNewPasswordInput}
                    onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl uppercase tracking-wider"
                >
                  Save New Password
                </button>
              </form>
            )}

            {resetStep === 'success' && (
              <div className="space-y-4 text-center text-xs">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-black text-sm text-white">Password Updated Successfully</h4>
                <p className="text-slate-300">Your account credentials have been updated. You can now sign in with your new password.</p>
                <button
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setResetStep('request');
                    setActiveTab('signin');
                  }}
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl uppercase tracking-wider"
                >
                  Proceed to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Account Deletion Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-slate-900 border border-rose-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h3 className="font-black text-sm text-rose-400 uppercase">Confirm Account Deletion</h3>
              </div>
              <button onClick={() => setShowDeleteModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-200 space-y-2">
              <p className="font-bold">Warning: This action cannot be undone!</p>
              <p>
                Deleting your account will permanently wipe your seafarer profile, API keys, saved brand logos, and digital passport data.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-300 block">
                Type <span className="text-rose-400 font-mono">DELETE</span> in all caps to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-slate-950 border border-rose-500/50 rounded-xl px-3 py-2 text-center font-mono font-bold text-white focus:outline-none"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationInput.trim().toUpperCase() !== 'DELETE'}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-lg uppercase"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden relative text-white my-auto flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-cyan-500/40 p-0.5 bg-slate-950 shadow-lg shadow-cyan-500/20 shrink-0">
              <img src={currentUser?.avatarLogoUrl || oceanBirdLogo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">OCEAN BIRD Auth & Logo Suite</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  PUBLIC PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                User Authentication, OAuth Providers, Email Validation, Brand Logo Generator & Profile
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center space-x-1 p-2.5 bg-slate-950 border-b border-slate-800 overflow-x-auto shrink-0">
          {currentUser ? (
            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTab('profile');
              }}
              className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap border ${
                activeTab === 'profile'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>User Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setActiveTab('signup');
                }}
                className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap border ${
                  activeTab === 'signup'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>User Signup</span>
              </button>

              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setActiveTab('signin');
                }}
                className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap border ${
                  activeTab === 'signin'
                    ? 'bg-indigo-500 text-slate-950 border-indigo-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Auth</span>
              </button>
            </>
          )}

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('logo-generator');
            }}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap border ${
              activeTab === 'logo-generator'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Brand Logo Generator</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setActiveTab('brand-press');
            }}
            className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap border ${
              activeTab === 'brand-press'
                ? 'bg-slate-800 text-cyan-300 border-cyan-500/40 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Official Logo Kit</span>
          </button>
        </div>

        {/* Content Body with Animated View Transitions */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 transition-all duration-300">
          {/* ========================================= */}
          {/* TAB 1: USER SIGNUP / AUTH */}
          {/* ========================================= */}
          {activeTab === 'signup' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Public User Signup & Authentication</span>
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Register for a free Ocean Bird seafarer account or sign up instantly with OAuth 2.0 social providers.
                </p>
              </div>

              {/* OAuth Providers Bar */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Sign up with OAuth Social Provider</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={!!oauthLoadingProvider}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('github')}
                    disabled={!!oauthLoadingProvider}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('microsoft')}
                    disabled={!!oauthLoadingProvider}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z" />
                      <path fill="#81bc06" d="M12 1h10v10H12z" />
                      <path fill="#05a6f0" d="M1 12h10v10H1z" />
                      <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                    <span>Microsoft</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('apple')}
                    disabled={!!oauthLoadingProvider}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.92-14.42-6.15-3.37-2.73-7.29-7.46-11.77-14.21-6.19-9.33-11.05-19.92-14.58-31.76-3.53-11.84-5.29-23.36-5.29-34.56 0-14.71 3.73-26.78 11.19-36.21 7.46-9.43 16.89-14.25 28.29-14.47 4.23 0 9.21 1.13 14.93 3.38 5.73 2.25 9.77 3.38 12.13 3.38 2.01 0 6.13-1.18 12.35-3.54 6.22-2.36 11.39-3.43 15.52-3.22 12.55.65 22.84 5.39 30.88 14.22-11.19 6.77-16.66 16.31-16.42 28.62.24 10.02 4.12 18.27 11.64 24.75 4.67 4.02 10.14 6.94 16.42 8.76-2.58 7.54-5.88 15.22-9.91 23.04zM119.22 31.85c0-7.39 2.72-14.47 8.16-21.25 5.44-6.78 12.17-10.6 20.2-11.46.24 1.18.36 2.24.36 3.18 0 7.39-2.78 14.51-8.34 21.36-5.56 6.85-12.35 10.64-20.38 11.37-.12-.83-.18-1.89-.18-3.2z" />
                    </svg>
                    <span>Apple</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('linkedin')}
                    disabled={!!oauthLoadingProvider}
                    className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50 col-span-2 sm:col-span-1"
                  >
                    <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>

                {oauthLoadingProvider && (
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-center text-xs font-mono text-cyan-300 animate-pulse flex items-center justify-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Connecting to {oauthLoadingProvider.toUpperCase()} OAuth Provider...</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 my-2">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Or Register with Email</span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        placeholder="e.g. Capt. Alexander Vance"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL WITH REALTIME VALIDATION */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-slate-300 block">Email Address *</label>
                      {emailValidationStatus === 'valid' && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Valid Email Syntax</span>
                        </span>
                      )}
                      {emailValidationStatus === 'invalid' && (
                        <span className="text-[10px] font-bold text-rose-400 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Invalid Email Format</span>
                        </span>
                      )}
                    </div>

                    <div className="relative flex space-x-2">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          value={signUpData.email}
                          onChange={(e) => handleSignUpEmailChange(e.target.value)}
                          placeholder="e.g. captain@oceanbird.org"
                          className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none ${
                            emailValidationStatus === 'valid'
                              ? 'border-emerald-500'
                              : emailValidationStatus === 'invalid'
                              ? 'border-rose-500'
                              : 'border-slate-800'
                          }`}
                          required
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={emailValidationStatus !== 'valid'}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 border border-slate-700 text-xs font-bold rounded-xl whitespace-nowrap flex items-center space-x-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send OTP Code</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">Account Sector Role *</label>
                    <select
                      value={signUpData.role}
                      onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Captain / Deck Officer">⚓ Captain / Deck Officer (STCW)</option>
                      <option value="Ocean Engineer">🌊 Ocean Engineer / Mining Scientist</option>
                      <option value="Fleet Operator">🚢 Vessel & Fleet Operator</option>
                      <option value="Airways Passenger">✈️ Airways & Cargo Traveler</option>
                      <option value="Public Citizen">🌐 Public Citizen & Coastal Resident</option>
                      <option value="Maritime Trainee">🎓 Maritime Student & Cadet</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">Organization / Institution</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={signUpData.organization}
                        onChange={(e) => setSignUpData({ ...signUpData, organization: e.target.value })}
                        placeholder="e.g. NIOT / Maersk Fleet"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">Password *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-white focus:outline-none focus:border-cyan-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 uppercase tracking-wider"
                >
                  <UserPlus className="w-4 h-4 text-slate-950" />
                  <span>Create Authenticated Account</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 2: SIGN IN / AUTH */}
          {/* ========================================= */}
          {activeTab === 'signin' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2">
                <span className="text-xs font-black uppercase text-indigo-400 flex items-center space-x-1.5">
                  <Key className="w-4 h-4" />
                  <span>Public Sign In & Authentication Portal</span>
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Sign in with OAuth 2.0 social providers, email address, or digital passport code.
                </p>
              </div>

              {/* OAuth Providers Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={!!oauthLoadingProvider}
                  className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('github')}
                  disabled={!!oauthLoadingProvider}
                  className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('microsoft')}
                  disabled={!!oauthLoadingProvider}
                  className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span>Microsoft</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('apple')}
                  disabled={!!oauthLoadingProvider}
                  className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.92-14.42-6.15-3.37-2.73-7.29-7.46-11.77-14.21-6.19-9.33-11.05-19.92-14.58-31.76-3.53-11.84-5.29-23.36-5.29-34.56 0-14.71 3.73-26.78 11.19-36.21 7.46-9.43 16.89-14.25 28.29-14.47 4.23 0 9.21 1.13 14.93 3.38 5.73 2.25 9.77 3.38 12.13 3.38 2.01 0 6.13-1.18 12.35-3.54 6.22-2.36 11.39-3.43 15.52-3.22 12.55.65 22.84 5.39 30.88 14.22-11.19 6.77-16.66 16.31-16.42 28.62.24 10.02 4.12 18.27 11.64 24.75 4.67 4.02 10.14 6.94 16.42 8.76-2.58 7.54-5.88 15.22-9.91 23.04zM119.22 31.85c0-7.39 2.72-14.47 8.16-21.25 5.44-6.78 12.17-10.6 20.2-11.46.24 1.18.36 2.24.36 3.18 0 7.39-2.78 14.51-8.34 21.36-5.56 6.85-12.35 10.64-20.38 11.37-.12-.83-.18-1.89-.18-3.2z" />
                  </svg>
                  <span>Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('linkedin')}
                  disabled={!!oauthLoadingProvider}
                  className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50 col-span-2 sm:col-span-1"
                >
                  <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
                  </svg>
                  <span>LinkedIn</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 my-2">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Or Sign In with Email</span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">Email Address or Passport ID</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        placeholder="e.g. captain@oceanbird.org"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-slate-300 block">Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmailInput(signInData.email);
                          setShowForgotPasswordModal(true);
                        }}
                        className="text-[11px] font-bold text-indigo-400 hover:underline flex items-center space-x-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Forgot Password?</span>
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 uppercase tracking-wider"
                >
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span>Authenticate & Sign In</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 3: USER PROFILE PAGE */}
          {/* ========================================= */}
          {activeTab === 'profile' && currentUser && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              {/* Profile Header Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400 p-0.5 bg-slate-900 shadow-xl shadow-emerald-500/20 shrink-0">
                    <img src={currentUser.avatarLogoUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h3 className="text-base font-black text-white">{currentUser.fullName}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {currentUser.accountTier}
                      </span>
                      {currentUser.isEmailVerified && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          <span>EMAIL VERIFIED</span>
                        </span>
                      )}
                      {currentUser.oauthProvider && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                          OAuth SSO ({currentUser.oauthProvider})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-300">
                      <span className="font-bold text-cyan-400">{currentUser.role}</span>
                      <span>•</span>
                      <span>{currentUser.organization}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
                  >
                    <LogOut className="w-4 h-4 text-amber-400" />
                    <span>Sign Out</span>
                  </button>

                  {/* ACCOUNT DELETION BUTTON */}
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
                    title="Delete Account & Data"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>

              {/* Edit Profile Form */}
              {isEditingProfile && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30 space-y-3 text-xs animate-in fade-in duration-200">
                  <h4 className="font-black text-cyan-400 uppercase text-xs flex items-center space-x-1.5">
                    <Sliders className="w-4 h-4" />
                    <span>Edit Profile Settings</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editProfileData.fullName || ''}
                        onChange={(e) => setEditProfileData({ ...editProfileData, fullName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editProfileData.email || ''}
                        onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-400 block mb-1">Organization</label>
                      <input
                        type="text"
                        value={editProfileData.organization || ''}
                        onChange={(e) => setEditProfileData({ ...editProfileData, organization: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-400 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editProfileData.phone || ''}
                        onChange={(e) => setEditProfileData({ ...editProfileData, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {/* Passport Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Passport Code</span>
                  <span className="font-mono font-bold text-emerald-300">{currentUser.id}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Security Level</span>
                  <span className="font-mono font-bold text-cyan-300">{currentUser.securityClearance}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">API Token Key</span>
                  <span className="font-mono text-amber-300 truncate block">{currentUser.apiKey || 'OB_LIVE_KEY'}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Member Since</span>
                  <span className="font-mono text-slate-300">{currentUser.registeredDate}</span>
                </div>
              </div>

              {/* Saved Brand Logos Gallery in User Profile */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-amber-400 text-xs uppercase flex items-center space-x-1.5">
                    <Palette className="w-4 h-4" />
                    <span>My Saved Brand Logos ({mySavedLogos.length})</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('logo-generator')}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center space-x-1"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Create New Logo</span>
                  </button>
                </div>

                {mySavedLogos.length === 0 ? (
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                    <ImageIcon className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">No generated brand logos saved yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mySavedLogos.map((logo) => (
                      <div key={logo.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div
                          className="w-full h-24 rounded-lg bg-slate-900 border border-slate-800 p-2 flex items-center justify-center overflow-hidden"
                          dangerouslySetInnerHTML={{ __html: logo.svgString }}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white truncate">{logo.brandName}</span>
                          <span className="text-[9px] font-mono text-slate-500">{logo.createdDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 4: GENERATOR BRAND LOGO TOOL */}
          {/* ========================================= */}
          {activeTab === 'logo-generator' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 flex items-center space-x-1.5">
                  <Wand2 className="w-4 h-4" />
                  <span>Interactive Brand Logo Generator Studio</span>
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Design custom vector logos for your maritime company, ocean engineering lab, or fleet brand. Export SVG files or set as your account avatar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Generator Controls */}
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Brand Title Text</label>
                    <input
                      type="text"
                      value={generatorState.brandName}
                      onChange={(e) => setGeneratorState({ ...generatorState, brandName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300 block">Subtitle / Slogan</label>
                    <input
                      type="text"
                      value={generatorState.subtitle}
                      onChange={(e) => setGeneratorState({ ...generatorState, subtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Emblem Icon</label>
                      <select
                        value={generatorState.iconShape}
                        onChange={(e) => setGeneratorState({ ...generatorState, iconShape: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white"
                      >
                        <option value="bird">🦅 Albatross Bird</option>
                        <option value="anchor">⚓ Maritime Anchor</option>
                        <option value="compass">🧭 Rudder Compass</option>
                        <option value="wave">🌊 Ocean Waves</option>
                        <option value="trident">🔱 Neptune Trident</option>
                        <option value="atom">⚛️ Quantum Energy</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Badge Shape</label>
                      <select
                        value={generatorState.layoutShape}
                        onChange={(e) => setGeneratorState({ ...generatorState, layoutShape: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white"
                      >
                        <option value="badge">🛡️ Rounded Shield</option>
                        <option value="circle">⭕ Circle Badge</option>
                        <option value="hexagon">⬡ Tech Hexagon</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Color Palette</label>
                      <select
                        value={generatorState.colorTheme}
                        onChange={(e) => setGeneratorState({ ...generatorState, colorTheme: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white"
                      >
                        <option value="cyan">🌊 Ocean Cyan & Blue</option>
                        <option value="emerald">🌿 Emerald & Gold</option>
                        <option value="gold">🌟 Sunset Gold & Amber</option>
                        <option value="purple">🔮 Neon Purple & Indigo</option>
                        <option value="silver">🩶 Platinum Silver</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Font Style</label>
                      <select
                        value={generatorState.fontStyle}
                        onChange={(e) => setGeneratorState({ ...generatorState, fontStyle: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white"
                      >
                        <option value="bold">Bold Sans</option>
                        <option value="tech">Tech Monospace</option>
                        <option value="futuristic">Futuristic Display</option>
                        <option value="classic">Classic Serif</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Live Preview & Actions */}
                <div className="flex flex-col items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                  <span className="text-[10px] font-mono uppercase text-slate-400 self-start">Live SVG Vector Canvas Preview</span>

                  <div
                    className="w-48 h-48 sm:w-56 sm:h-56 bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-2xl flex items-center justify-center overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: generateLogoSvgString() }}
                  />

                  <div className="w-full space-y-2">
                    <button
                      onClick={handleSaveGeneratedLogo}
                      className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Logo to Profile</span>
                    </button>

                    <div className="flex space-x-2">
                      <button
                        onClick={handleDownloadGeneratedLogo}
                        className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download SVG</span>
                      </button>

                      <button
                        onClick={handleSetLogoAsAvatar}
                        className="flex-1 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Set as Avatar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 5: OFFICIAL BRAND PRESS KIT */}
          {/* ========================================= */}
          {activeTab === 'brand-press' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-black text-white uppercase">Official OCEAN BIRD Trademark Press Kit</h3>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/50 p-1 bg-slate-950 shrink-0">
                    <img src={oceanBirdLogo} alt="Ocean Bird Official Logo" className="w-full h-full object-cover rounded-xl" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-white text-sm">OCEAN BIRD by Eastman Creation</h4>
                    <p className="text-xs text-slate-300">
                      Official trademark logo mark for South Asia & Indo-Pacific Maritime & Engineering Hub.
                    </p>
                    <span className="text-[10px] font-mono text-emerald-400 block">
                      Resolution: High Vector Scalable | Format: SVG / PNG / WEBP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
