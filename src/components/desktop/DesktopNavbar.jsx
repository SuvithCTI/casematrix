import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, Smartphone, Sparkles, Home, ShieldCheck, PhoneCall, MessageSquare, User, LogIn, LogOut, LayoutDashboard, ChevronDown, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';
import BrandLogo from '../common/BrandLogo';

export default function DesktopNavbar({ activeTab, setActiveTab }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { currentUser, isAuthenticated, isAdmin, openAuthModal, logout } = useAuth();
  const { orders = [] } = useOrder();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userOrdersCount = orders.filter(
    o => o.customer?.email?.toLowerCase() === currentUser?.email?.toLowerCase() ||
         o.customer?.phone === currentUser?.phone ||
         (currentUser?.name && o.customer?.name?.toLowerCase() === currentUser?.name?.toLowerCase())
  ).length;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Smartphone },
    { id: 'about', label: 'About', icon: ShieldCheck },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleTabSelect = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
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

          {/* Dedicated My Orders Nav Item for Customers */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => handleTabSelect('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition relative flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'orders' || activeTab === 'my-orders'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>My Orders</span>
              {userOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                  {userOrdersCount}
                </span>
              )}
            </button>
          )}

          {isAdmin && (
            <button
              type="button"
              onClick={() => handleTabSelect('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition relative flex items-center gap-1.5 border ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md'
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}
        </nav>

        {/* Actions (Auth, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User / Auth Action (Desktop) */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white transition text-xs font-bold cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-[10px]">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[90px] truncate">{currentUser?.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#14100c] border border-amber-500/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isAdmin ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {currentUser.role}
                      </span>
                    </div>

                    {/* My Orders Dropdown Item */}
                    <button
                      type="button"
                      onClick={() => handleTabSelect('orders')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                        activeTab === 'orders' || activeTab === 'my-orders'
                          ? 'bg-amber-500/20 text-amber-400 font-black'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Package className="w-4 h-4 text-amber-400" />
                        <span>My Orders</span>
                      </div>
                      {userOrdersCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                          {userOrdersCount}
                        </span>
                      )}
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleTabSelect('admin')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-400 hover:bg-amber-500/15 transition text-left cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-400" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/15 transition text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleTabSelect('signin')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white transition text-xs font-bold cursor-pointer"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>

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
          {/* User Profile Bar for Mobile */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-xs">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-amber-400 font-bold uppercase">{currentUser.role} account</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleTabSelect('admin')}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-300">Welcome to Case Matrix</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleTabSelect('signin');
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleTabSelect('admin-login');
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}
          </div>

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
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => handleTabSelect('orders')}
                className={`col-span-2 p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border ${
                  activeTab === 'orders' || activeTab === 'my-orders'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black'
                    : 'bg-white/[0.06] border-white/10 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <Package className="w-4 h-4" />
                  </div>
                  <span>My Orders & Delivery Tracking</span>
                </div>
                {userOrdersCount > 0 && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                    {userOrdersCount} {userOrdersCount === 1 ? 'Order' : 'Orders'}
                  </span>
                )}
              </button>
            )}
            {isAdmin && (
              <button
                type="button"
                onClick={() => handleTabSelect('admin')}
                className={`col-span-2 p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border ${
                  activeTab === 'admin'
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                    : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <span>Admin Management Dashboard</span>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">Live</span>
              </button>
            )}
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

