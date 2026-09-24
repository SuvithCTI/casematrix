import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Store, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/common/BrandLogo';

export default function DesktopAuthView({ initialTab = 'signin', setActiveTab, onNavigateHome, onNavigateAdmin }) {
  const { login, signup } = useAuth();

  const [authMode, setAuthMode] = useState(initialTab === 'signup' ? 'signup' : 'signin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  useEffect(() => {
    if (initialTab === 'signup') {
      setAuthMode('signup');
    } else if (initialTab === 'admin' || initialTab === 'admin-login') {
      setAuthMode('signin');
      setSignInEmail('casematrix@gmail.com');
    } else {
      setAuthMode('signin');
    }
    setErrorMessage('');
    setSuccessMessage('');
  }, [initialTab]);

  const handleGoHome = () => {
    if (setActiveTab) {
      setActiveTab('home');
    } else if (onNavigateHome) {
      onNavigateHome();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    let emailToSubmit = signInEmail.trim();
    if (emailToSubmit && !emailToSubmit.includes('@')) {
      emailToSubmit = `${emailToSubmit}@gmail.com`;
    }

    const res = login(emailToSubmit, signInPassword);
    if (res.success) {
      if (res.user.role === 'admin') {
        setSuccessMessage(`Welcome Admin ${res.user.name || ''}! Opening dashboard...`);
        setTimeout(() => {
          if (setActiveTab) {
            setActiveTab('admin');
          } else if (onNavigateAdmin) {
            onNavigateAdmin();
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
      } else {
        setSuccessMessage(`Welcome back, ${res.user.name}! Redirecting to store...`);
        setTimeout(() => {
          handleGoHome();
        }, 400);
      }
    } else {
      setErrorMessage(res.message || 'Invalid email or password');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    let emailToSubmit = signUpEmail.trim();
    if (emailToSubmit && !emailToSubmit.includes('@')) {
      emailToSubmit = `${emailToSubmit}@gmail.com`;
    }

    const res = signup({
      name: signUpName.trim() || emailToSubmit.split('@')[0],
      email: emailToSubmit,
      phone: signUpPhone.trim(),
      password: signUpPassword.trim() || '123456'
    });

    if (res.success) {
      if (res.user.role === 'admin') {
        setSuccessMessage('Admin account registered! Opening dashboard...');
        setTimeout(() => {
          if (setActiveTab) {
            setActiveTab('admin');
          } else if (onNavigateAdmin) {
            onNavigateAdmin();
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
      } else {
        setSuccessMessage(`Account created for ${res.user.name}! Welcome to Case Matrix.`);
        setTimeout(() => {
          handleGoHome();
        }, 400);
      }
    } else {
      setErrorMessage(res.message || 'Error creating account');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans antialiased">
      
      {/* Top Navigation Header */}
      <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-4 shadow-xs sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            onClick={handleGoHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <BrandLogo variant="light" size="md" />
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition block">
                Case Matrix
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                iPhone Studio India
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoHome}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Store className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Back to Customer Store</span>
            <span className="sm:hidden">Store</span>
          </button>
        </div>
      </header>

      {/* Main Sign-In Center Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header & 2-Way Mode Switcher Tabs */}
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200/80 shadow-xs mb-3">
                <User className="w-6 h-6 text-amber-600" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {authMode === 'signin' ? 'Sign In to Case Matrix' : 'Create Your Account'}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {authMode === 'signin' 
                  ? 'Sign in with your email and password to access your customer account or admin dashboard'
                  : 'Join for express checkout, VIP warranty & instant order tracking'}
              </p>
            </div>

            {/* 2-Way Segmented Switcher (Sign In vs Sign Up) */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
                className={`py-2 rounded-xl transition cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
                className={`py-2 rounded-xl transition cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Alert / Feedback Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ========================================================
              1. SIGN IN FORM (AUTOMATICALLY HANDLES BOTH USER & ADMIN)
          ======================================================== */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="e.g., casematrix@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-xs font-medium focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-xs font-medium focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-[11px] text-slate-500">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </div>
            </form>
          )}

          {/* ========================================================
              2. SIGN UP FORM
          ======================================================== */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g., Rohan Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-xs font-medium focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="rohan@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-xs font-medium focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Phone / WhatsApp Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-xs font-medium focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Create Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-xs font-medium focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Account & Join Studio</span>
              </button>

              <div className="text-center pt-1 text-[11px] text-slate-500">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Sign In instead
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Page Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-4 px-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Case Matrix Operations • 256-Bit Encrypted Authentication</p>
          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={handleGoHome} className="hover:text-amber-700 font-bold cursor-pointer">Storefront</button>
            <span>•</span>
            <button onClick={() => setAuthMode('signin')} className="hover:text-amber-700 font-bold cursor-pointer">Sign In</button>
            <span>•</span>
            <button onClick={() => setAuthMode('signup')} className="hover:text-amber-700 font-bold cursor-pointer">Create Account</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
