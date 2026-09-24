import React from 'react';
import { MessageSquare, ArrowUp, ShieldCheck, FolderOpen, Smartphone, Sparkles, CheckCircle2, Award, Headphones, MapPin, Phone } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { useProduct } from '../../context/ProductContext';
import BrandLogo from '../common/BrandLogo';

export default function DesktopFooter({ setActiveTab, onOpenLegal }) {
  const { setIsEnquiryModalOpen } = useOrder();
  const { setSelectedSeries, setSelectedModel } = useProduct();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    scrollToTop();
  };

  const handleSeriesFilter = (seriesName) => {
    setSelectedSeries(seriesName);
    setSelectedModel('all');
    setActiveTab('products');
    scrollToTop();
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#0e0c0a] via-[#090806] to-[#040302] border-t border-amber-500/20 text-slate-400 text-xs">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-4">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-left cursor-pointer group"
            >
              <BrandLogo size="md" />
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Crafting aerospace-grade titanium cases, 15W Qi2 MagSafe wireless accessories, and precision sapphire lens armor designed exclusively for the Apple iPhone ecosystem across India.
            </p>

            {/* Official Store Address & Phone Info */}
            <div className="space-y-2 pt-1 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Express Avenue, 17, Pattullos Rd, Express Estate, Thousand Lights, Chennai, Tamil Nadu - 600014</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+919384694189" className="hover:text-amber-400 font-bold text-white transition">
                  +91 93846 94189
                </a>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-amber-500/40 text-xs font-bold transition shadow-sm text-center active:scale-95 cursor-pointer"
              >
                Corporate Quote
              </button>
              <a
                href="https://wa.me/919384694189?text=Hi%20Case%20Matrix!%20Need%20direct%20order%20assistance"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm text-center active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" /> WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Navigation & Links Columns - 2 Columns on Mobile, 7 cols on Desktop */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Column 1: Store Pages */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-white uppercase text-[11px] sm:text-xs tracking-wider flex items-center gap-1.5">
                <FolderOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Explore
              </h5>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('products')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    All iPhone Cases
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    Our Technology
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    Contact & Store
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('admin')} className="hover:text-amber-400 transition text-amber-500/80 font-bold text-left cursor-pointer flex items-center gap-1">
                    <span>Admin Portal</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-400 rounded">Secure</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Supported Models */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-white uppercase text-[11px] sm:text-xs tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Models
              </h5>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <button onClick={() => handleSeriesFilter('iPhone 16 Series')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    iPhone 16 Series
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSeriesFilter('iPhone 15 Series')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    iPhone 15 Series
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSeriesFilter('iPhone 14 Series')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    iPhone 14 Series
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSeriesFilter('iPhone 13 Series')} className="hover:text-amber-400 transition text-slate-400 text-left cursor-pointer">
                    iPhone 13 Series
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Assurance */}
            <div className="col-span-2 sm:col-span-1 space-y-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:border-transparent">
              <h5 className="font-extrabold text-white uppercase text-[11px] sm:text-xs tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Guarantee
              </h5>
              <ul className="space-y-2 text-xs font-medium">
                <li className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>2-Year Warranty</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-400">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>100% Genuine Titanium</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-400">
                  <Headphones className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>VIP WhatsApp Desk</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Anti-Yellowing Shield</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-slate-500 text-[11px] bg-[#040302] text-center sm:text-left">
        <p>© 2026 Case Matrix India. Express Avenue. All rights reserved.</p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button type="button" onClick={() => onOpenLegal('terms')} className="text-slate-400 hover:text-amber-400 transition cursor-pointer">
            Terms & Conditions
          </button>
          <span className="text-white/20">•</span>
          <button type="button" onClick={() => onOpenLegal('privacy')} className="text-slate-400 hover:text-amber-400 transition cursor-pointer">
            Privacy Policy
          </button>
          <span className="text-white/20">•</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition font-bold cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
