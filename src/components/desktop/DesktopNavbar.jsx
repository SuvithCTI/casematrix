import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Smartphone, Sparkles, Home, ShieldCheck, PhoneCall, MessageSquare, XCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import BrandLogo from '../common/BrandLogo';

export default function DesktopNavbar({ activeTab, setActiveTab }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Smartphone },
    { id: 'about', label: 'About', icon: ShieldCheck },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleTabSelect = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#0c0a09] via-[#14100b] to-[#0c0a09] backdrop-blur-xl border-b border-amber-500/20 shadow-xl text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleTabSelect('home')}
          className="group text-left shrink-0 cursor-pointer"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabSelect(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition relative flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Actions (Cart, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition transform hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Bag</span>
            {totalItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[11px] font-black flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-500/20 bg-[#0f0c08]/98 backdrop-blur-2xl px-4 py-4 space-y-3.5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSelect(tab.id)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-black scale-[1.01]'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-white/10 text-amber-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Quick Help Banner in Drawer */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Sparkles className="w-3 h-3 text-amber-400" /> 100% Genuine Titanium
            </span>
            <a
              href="https://wa.me/919384694189?text=Hi%20Case%20Matrix!%20Need%20quick%20support"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Help
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
