import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Star, MessageSquare, ChevronRight, Smartphone } from 'lucide-react';
import HeroPhoneShowcase from '../../components/common/HeroPhoneShowcase';
import MobileCategoryPills from '../../components/mobile/MobileCategoryPills';
import MobileProductCard from '../../components/mobile/MobileProductCard';
import ExplodedLayerShowcase from '../../components/common/ExplodedLayerShowcase';
import { PRODUCTS } from '../../data/products';
import { COLOR_OPTIONS, IPHONE_MODELS } from '../../data/categories';
import { REVIEWS, BRAND_STATS } from '../../data/reviews';
import { useProduct } from '../../context/ProductContext';
import { useOrder } from '../../context/OrderContext';

export default function MobileHomeView({ setActiveTab }) {
  const [heroColor, setHeroColor] = useState('#c5b49e');
  const { setSelectedModel } = useProduct();
  const { setIsEnquiryModalOpen } = useOrder();

  return (
    <div className="space-y-7 px-4 py-4 pb-28">
      {/* 1. Mobile Hero Showcase with Silk Waves Background */}
      <section className="space-y-4">
        <HeroPhoneShowcase activeColor={heroColor} setActiveColor={setHeroColor} />

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className="min-h-[44px] py-3 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
          >
            Shop Cases <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className="min-h-[44px] py-3 px-3 rounded-2xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 shadow-xs active:scale-95 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> About Tech
          </button>
        </div>
      </section>

      {/* 2. Category Scroll Pills */}
      <section className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Browse Collections</span>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className="text-[11px] text-amber-700 font-semibold"
          >
            See all
          </button>
        </div>
        <MobileCategoryPills />
      </section>

      {/* 3. iPhone Model Quick Chips */}
      <section className="space-y-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block px-1">
          Select Your iPhone Model
        </span>
        <div className="grid grid-cols-2 gap-2">
          {IPHONE_MODELS.slice(1, 5).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedModel(m.id);
                setActiveTab('products');
              }}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 text-left flex items-center justify-between shadow-xs hover:border-amber-500/50"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{m.name}</p>
                <p className="text-[10px] text-amber-700 font-bold">View Cases →</p>
              </div>
              <Smartphone className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      </section>

      {/* 4. Trending Best Sellers Grid */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">Trending iPhone Gear</h3>
            <p className="text-[11px] text-slate-700 font-medium">Top rated MagSafe cases & protectors in ₹</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold text-amber-700"
          >
            All Products →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.slice(0, 4).map((p) => (
            <MobileProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 5. 2D Exploded Layer Drop Protection */}
      <section>
        <ExplodedLayerShowcase />
      </section>

      {/* 6. Customer Reviews */}
      <section className="space-y-3">
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 text-amber-600 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-500" /> Rated 4.9/5 by 120k+ iPhone Users
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Verified iPhone Drops in India</h3>
        </div>

        <div className="space-y-2.5">
          {REVIEWS.slice(0, 2).map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={rev.avatar} alt={rev.name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                  <span className="font-bold text-slate-900">{rev.name}</span>
                </div>
                <span className="text-[10px] text-amber-700 font-bold">{rev.phoneModel}</span>
              </div>
              <p className="text-slate-600 italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WhatsApp Callout Card */}
      <section
        className="p-5 rounded-2xl text-white text-center space-y-3 shadow-lg border border-emerald-500/30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 78, 59, 0.92), rgba(15, 23, 42, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover'
        }}
      >
        <h4 className="text-sm font-bold text-white">Need help picking an iPhone case?</h4>
        <p className="text-xs text-slate-200 leading-relaxed">
          Chat with our concierge on WhatsApp for real photos, compatibility advice, and direct orders with instant UPI.
        </p>
        <a
          href="https://wa.me/919384694189?text=Hi%20Case%20Matrix!%20Need%20help%20choosing%20an%20iPhone%20case"
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-md inline-block"
        >
          <MessageSquare className="w-4 h-4" /> Message on WhatsApp
        </a>
      </section>
    </div>
  );
}
