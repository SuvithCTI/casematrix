import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  MessageSquare,
  Truck,
  Smartphone,
  Shield,
  BatteryCharging,
  Headphones,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import HeroPhoneShowcase from '../../components/common/HeroPhoneShowcase';
import DesktopProductCard from '../../components/desktop/DesktopProductCard';
import { REVIEWS, BRAND_STATS } from '../../data/reviews';
import { useProduct } from '../../context/ProductContext';
import { useOrder } from '../../context/OrderContext';

export default function DesktopHomeView({ setActiveTab }) {
  const {
    products,
    setSelectedCategory,
    setSelectedModel
  } = useProduct();

  const { setIsEnquiryModalOpen } = useOrder();

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Auto-advance reviews on mobile every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const CATEGORY_CARDS = [
    {
      id: 'phones',
      name: 'Mobile Phones',
      icon: Smartphone,
      badge: 'Flagship 5G',
      gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-500',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      iconColor: 'text-amber-600',
      desc: 'Apple iPhone 16 Pro Max, iPhone 17 & Flagship 5G Smartphones'
    },
    {
      id: 'cases',
      name: 'Cases & Covers',
      icon: Shield,
      badge: 'Drop Certified',
      gradient: 'from-amber-600/10 via-amber-600/5 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-500',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      iconColor: 'text-amber-700',
      desc: 'Titanium Armor, MagSafe Qi2 arrays, liquid silicone & luxury covers'
    },
    {
      id: 'powerbanks',
      name: 'Power Banks',
      icon: BatteryCharging,
      badge: '20,000mAh PD',
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
      border: 'border-blue-500/30 hover:border-blue-500',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      iconColor: 'text-blue-600',
      desc: 'High-capacity fast charging banks with digital LED % displays'
    },
    {
      id: 'chargers',
      name: 'Fast Chargers',
      icon: Zap,
      badge: '15W MagSafe',
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
      border: 'border-purple-500/30 hover:border-purple-500',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      iconColor: 'text-purple-600',
      desc: 'MagSafe floating desktop docks with nightlights & PD wall chargers'
    },
    {
      id: 'earpods',
      name: 'EarPods & Audio',
      icon: Headphones,
      badge: 'Spatial Audio',
      gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      border: 'border-emerald-500/30 hover:border-emerald-500',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconColor: 'text-emerald-600',
      desc: 'Apple AirPods Pro 2 USB-C with 2x Active Noise Cancellation'
    }
  ];

  // Top featured products representing all 5 categories
  const featuredCatalog = [
    products.find(p => p.category === 'phones'),
    products.find(p => p.category === 'cases'),
    products.find(p => p.category === 'powerbanks'),
    products.find(p => p.category === 'chargers'),
    products.find(p => p.category === 'earpods')
  ].filter(Boolean);

  const averageRating = REVIEWS.reduce((total, review) => total + review.rating, 0) / REVIEWS.length;

  return (
    <div className="space-y-12 sm:space-y-20 pb-16 sm:pb-20 w-full">
      {/* 1. HERO SECTION WITH LUXURY DESERT GOLD SHOWCASE - Full Width */}
      <section className="relative pt-6 sm:pt-8 pb-4 overflow-hidden w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Flagship Mobiles & Premium Accessories
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Flagship Mobiles. <br />
                <span className="text-gradient-gold">Cases & Accessories.</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-xl">
                Explore the latest flagship 5G smartphones, aerospace titanium armor cases, high-capacity fast charging banks, MagSafe desktop docks, and ANC wireless EarPods with express delivery across India.
              </p>
            </div>

            {/* CTAs - Single column on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedModel('all');
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition transform active:scale-95"
              >
                Shop Mobiles & Accessories <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <a
                href="https://wa.me/919876543210?text=Hi%20Case%20Matrix!%20Need%20recommendations%20for%20mobiles%20and%20accessories"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp Support
              </a>
            </div>

            {/* Mobile View Hero Phone Showcase (Displayed immediately after Shop buttons on mobile) */}
            <div className="block lg:hidden pt-2 pb-1">
              <HeroPhoneShowcase />
            </div>

            {/* Value Highlights Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" /> 16FT Drop Proof
                </div>
                <p className="text-[11px] text-slate-700 font-medium leading-tight">MIL-STD-810H armor</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                  <Zap className="w-4 h-4 text-amber-700 shrink-0" /> 15W MagSafe
                </div>
                <p className="text-[11px] text-slate-700 font-medium leading-tight">38 N52 neodymium</p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                  <Truck className="w-4 h-4 text-amber-700 shrink-0" /> Express India
                </div>
                <p className="text-[11px] text-slate-700 font-medium leading-tight">Free shipping on ₹999+</p>
              </div>
            </div>

            {/* Trust Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-200">
              {BRAND_STATS.map((stat, idx) => (
                <div key={idx} className="p-2.5 bg-white/60 sm:bg-transparent rounded-2xl border sm:border-0 border-slate-200/60 text-center sm:text-left">
                  <p className="text-base sm:xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-700 font-semibold leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Column (Luxury Silk Wave Showcase on Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 items-center justify-center pt-4 lg:pt-0">
            <HeroPhoneShowcase />
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY: MOBILES & ACCESSORIES */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Complete Device Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Mobiles & Accessories
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
            Choose from flagship smartphones, certified drop protection cases, fast power banks, and audio gear
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedModel('all');
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white hover:bg-slate-50/80 border ${cat.border} transition-all duration-300 text-left group shadow-xs hover:shadow-lg flex flex-col justify-between active:scale-95 relative overflow-hidden last:col-span-2 md:last:col-span-1`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${cat.gradient} rounded-bl-full pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between gap-1 mb-3">
                    <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-amber-500/10 transition">
                      <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border ${cat.tagColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-700 transition">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium mt-1 leading-snug line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-700 group-hover:text-amber-800">
                  <span>Browse Collection</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED MOBILES & ACCESSORIES SHOWCASE */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Hand-Picked Best Sellers
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Mobiles & Essential Gear
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
              Top-rated smartphones, MagSafe armor cases, high-capacity banks & wireless charging accessories
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedModel('all');
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <span>View All Gear</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-4 w-full">
          {featuredCatalog.map((product) => (
            <DesktopProductCard
              key={product.id}
              product={product}
              className={product.category === 'earpods' ? 'hidden sm:flex' : ''}
            />
          ))}
        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS - Fluid Full Width */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center justify-center gap-1.5 flex-wrap">
            <span className="flex items-center gap-0.5" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
              {[...Array(5)].map((_, index) => (
                <Star key={index} className={`w-4 h-4 ${index < Math.round(averageRating) ? 'fill-amber-500' : ''}`} />
              ))}
            </span>
            <span>Rated {averageRating.toFixed(1)}/5 from {REVIEWS.length} verified reviews</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Real Customer Reviews & Ratings
          </h2>
        </div>

        {/* Mobile View: Single Row / Single Column Carousel (Auto & Manual) */}
        <div className="block sm:hidden">
          <div className="relative p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between min-h-[180px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {REVIEWS[activeReviewIndex].phoneModel}
                </span>
              </div>
              <p className="text-xs text-slate-800 font-medium italic leading-relaxed">
                "{REVIEWS[activeReviewIndex].comment}"
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-900">{REVIEWS[activeReviewIndex].name}</h5>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-500" /> Verified Buyer
                </p>
              </div>

              {/* Manual Prev / Next Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevReview}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextReview}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveReviewIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeReviewIndex === i ? 'w-5 bg-amber-600' : 'w-1.5 bg-slate-300'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: Full Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-3.5 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 mb-2 sm:mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-800 font-medium italic leading-relaxed mb-2.5 sm:mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-slate-900">{rev.name}</h5>
                  <p className="text-[9px] sm:text-[10px] text-amber-800 font-bold">{rev.phoneModel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHATSAPP & B2B CALLOUT BANNER - Compact Mobile Height & 2-Column Buttons */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div
          className="rounded-2xl lg:rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white py-4 sm:py-5 lg:py-6 px-5 sm:px-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6 shadow-xl"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(6, 78, 59, 0.9), rgba(15, 23, 42, 0.95)), url('/images/desert-gold-bg.png')`,
            backgroundSize: 'cover'
          }}
        >
          <div className="space-y-1 sm:space-y-1.5 max-w-xl text-center lg:text-left">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold border border-emerald-500/30 inline-flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Instant VIP Support
            </span>
            <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white tracking-tight">
              Order via WhatsApp with Instant UPI Confirmation
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Have questions about flagship mobiles, power banks, chargers, or accessories? Chat with our specialist on WhatsApp in seconds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 shrink-0 w-full lg:w-auto">
            <a
              href="https://wa.me/919876543210?text=Hello%20Case%20Matrix!%20I%20would%20like%20to%20order%20mobiles%20or%20accessories"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition transform active:scale-95 text-center"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Chat on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full sm:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition text-center truncate"
            >
              Corporate Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
