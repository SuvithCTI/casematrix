import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from './BrandLogo';

export default function AuthModal({ onNavigateAdmin }) {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    signup, 
    loginAsDemoAdmin, 
    loginAsDemoUser 
  } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      if (res.user.role === 'admin' && onNavigateAdmin) {
        onNavigateAdmin();
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    const res = signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword
    });

    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleAdminQuickLogin = () => {
    loginAsDemoAdmin();
    if (onNavigateAdmin) {
      onNavigateAdmin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0f0c08] border border-amber-500/30 rounded-3xl shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow & Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/10 bg-gradient-to-b from-[#1c150e] to-[#0f0c08]">
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" />
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-2xl mt-5 border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('login');
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition cursor-pointer ${
                authModalTab === 'login'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('signup');
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition cursor-pointer ${
                authModalTab === 'signup'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('admin');
                setErrorMsg('');
              }}
              className={`py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${
                authModalTab === 'admin'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              <KeyRound className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {authModalTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="user@casematrix.in"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer mt-2"
              >
                Sign In to Account
              </button>

              {/* Quick Demo Logins Bar */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
                  Quick Demo 1-Click Login (Local Storage)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={loginAsDemoUser}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-amber-400" /> Demo User
                  </button>
                  <button
                    type="button"
                    onClick={handleAdminQuickLogin}
                    className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Demo Admin
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP */}
          {authModalTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Aditya Verma"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="aditya@icloud.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Phone Number (For WhatsApp Updates)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 93846 94189"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">Password *</label>
                  <input
                    required
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">Confirm *</label>
                  <input
                    required
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer mt-2"
              >
                Create Account
              </button>
            </form>
          )}

          {/* TAB 3: ADMIN LOGIN */}
          {authModalTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-red-500/10 to-transparent border border-amber-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <KeyRound className="w-4 h-4" />
                  <span>Case Matrix Admin Console</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Sign in with administrator credentials to manage products, customer orders, corporate quote requests, and store analytics stored in your browser's local storage.
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-slate-300 space-y-1">
                  <p><span className="text-slate-500">Admin Email:</span> <span className="text-amber-300 font-bold">casematrix@gmail.com</span></p>
                  <p><span className="text-slate-500">Admin Password:</span> <span className="text-amber-300 font-bold">casematrix</span></p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdminQuickLogin}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs transition shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" /> Sign In as Admin & Open Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
