import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Layers, 
  Smartphone, 
  Headphones,
  Compass 
} from 'lucide-react';
import { BRAND_STATS } from '../../data/reviews';
import BrandLogo from '../../components/common/BrandLogo';

export default function DesktopAboutView({ setActiveTab }) {
  const handleNav = (tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const productPillars = [
    {
      icon: Smartphone,
      title: 'Flagship 5G Phones',
      tag: 'Flagships',
      desc: '100% genuine Apple, Samsung, and OnePlus phones with official brand warranty.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: ShieldCheck,
      title: '16FT Drop Armor',
      tag: 'Drop Armor',
      desc: 'Military-grade drop shield cases crafted with aerospace titanium & Bayer polymer.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: Zap,
      title: 'Power & Fast Charging',
      tag: 'Power Tech',
      desc: 'High-speed 20,000mAh banks, GaN wall chargers & MagSafe Qi2 wireless docks.',
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
    },
    {
      icon: Headphones,
      title: 'Studio ANC Audio',
      tag: 'Acoustics',
      desc: 'Premium wireless EarPods with Active Noise Cancellation & immersive spatial audio.',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-14 space-y-12 sm:space-y-20">
      
      {/* 1. HERO BANNER */}
      <section
        className="rounded-3xl p-6 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-amber-500/30 text-center max-w-5xl mx-auto"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 12, 8, 0.88), rgba(15, 12, 8, 0.96)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" /> The Case Matrix Philosophy
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Flagship Mobiles & Armor. <br />
          <span className="text-gradient-gold">Engineered for Excellence.</span>
        </h1>
        
        <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto mt-4 font-normal">
          Born in Chennai, India, Case Matrix was founded with a singular conviction: to deliver genuine flagship 5G smartphones, aerospace-grade titanium armor cases, high-capacity power banks, MagSafe docks, and studio-grade EarPods across India.
        </p>

        <div className="pt-6 flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => handleNav('products')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            Explore Mobiles & Accessories <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
          <a
            href="https://wa.me/919384694189?text=Hi%20Case%20Matrix!%20Tell%20me%20more%20about%20your%20mobiles%20and%20accessories"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Concierge
          </a>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full">
        {BRAND_STATS.map((stat, i) => (
          <div key={i} className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 text-center shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</h3>
            <p className="text-xs text-slate-700 font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 3. OUR STORY & STUDIO EXPERIENCE (2 Columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch w-full">
        
        {/* Left Column: The Brand Narrative */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Our Origin & Mission
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why We Built Case Matrix
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Every flagship device is an engineering masterpiece. Yet, finding authentic smartphones paired with certified drop-protection armor, high-capacity 20,000mAh power banks, MagSafe Qi2 desktop docks, and ANC EarPods under one trusted roof in India has always been a challenge.
            </p>
            
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              We founded <strong>Case Matrix</strong> to bridge this gap. Operating from our flagship studio at Express Avenue in Chennai, our team tests, curates, and delivers genuine <strong>flagship 5G smartphones</strong>, <strong>16-foot drop-certified armor cases</strong>, <strong>high-output fast chargers</strong>, and <strong>audiophile-grade wireless EarPods</strong> tailored for Indian life.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">100% Genuine Devices & Gear</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">2-Year Replacement Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">Express Delivery Across India</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">Direct WhatsApp Concierge</span>
            </div>
          </div>
        </div>

        {/* Right Column: Flagship Experience Center Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#120d09] via-[#1c150e] to-[#0d0a07] rounded-3xl p-6 sm:p-10 border border-amber-500/30 text-white shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <BrandLogo size="lg" />

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                Flagship Experience Center
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Visit Us at Express Avenue
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test our flagship mobiles, experience titanium armor cases, try out high-capacity power banks, and test MagSafe charging stands in person at our Chennai store.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Express Avenue, 17, Pattullos Rd, Express Estate, Thousand Lights, Chennai, Tamil Nadu - 600014
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919384694189" className="text-white hover:text-amber-400 font-bold transition">
                  +91 93846 94189
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition text-center active:scale-95 cursor-pointer"
            >
              Get Store Directions
            </button>
            <a
              href="https://wa.me/919384694189?text=Hi%20Case%20Matrix!%20I%20would%20like%20to%20visit%20your%20Express%20Avenue%20Store"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition text-center border border-white/20 active:scale-95 cursor-pointer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </section>

      {/* 4. PRODUCT ENGINEERING & MATERIALS (4 Cards) */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Advanced Engineering
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Engineered for Mobiles & Premium Gear
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            From flagship processors to drop-shield alloys and GaN fast-charging circuits, every device and accessory is built for longevity.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
          {productPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-2 sm:space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center border mb-2 sm:mb-3 ${item.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{item.tag}</span>
                  <h4 className="text-xs sm:text-base font-bold text-slate-900 mt-1 leading-snug">{item.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed mt-1.5 sm:mt-2">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION BOTTOM BANNER */}
      <section className="w-full">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-500/30 text-center lg:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 100% Satisfaction Guarantee
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
              Ready to Upgrade Your Mobile & Accessory Experience?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore our curated catalog of genuine flagship 5G smartphones, military drop-shield cases, fast power banks, and studio EarPods with express pan-India dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => handleNav('products')}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition active:scale-95 cursor-pointer"
            >
              Shop All Products
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              Contact Team
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
