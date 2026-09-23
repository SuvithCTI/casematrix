import React from 'react';
import { Sparkles, Zap, CheckCircle2, ShoppingBag, MessageSquare, Check } from 'lucide-react';
import { COLOR_OPTIONS } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { PRODUCTS } from '../../data/products';

const COLOR_IMAGE_MAP = {
  '#c5b49e': {
    image: '/images/hero-desert-gold.jpg',
    name: 'Desert Titanium Gold',
    badge: 'iPhone 16 Pro Max Edition',
    accentColor: '#c5a059',
    glow: 'rgba(197, 160, 89, 0.45)'
  },
  '#1c1d22': {
    image: '/images/hero-black-titanium.jpg',
    name: 'Obsidian Titanium Black',
    badge: 'Stealth Space Black Edition',
    accentColor: '#475569',
    glow: 'rgba(28, 29, 34, 0.65)'
  },
  '#8a8d91': {
    image: '/images/hero-natural-titanium.jpg',
    name: 'Natural Titanium Gray',
    badge: 'Raw Aerospace Grade 5',
    accentColor: '#94a3b8',
    glow: 'rgba(138, 141, 145, 0.5)'
  },
  '#1e382b': {
    image: '/images/hero-forest-green.jpg',
    name: 'Alpine Forest Green',
    badge: 'Luxury Botanical Green',
    accentColor: '#10b981',
    glow: 'rgba(30, 56, 43, 0.55)'
  },
  '#8b4513': {
    image: '/images/hero-saddle-brown.jpg',
    name: 'Saddle Tan Cognac Leather',
    badge: 'Italian Full-Grain Patina',
    accentColor: '#d97706',
    glow: 'rgba(139, 69, 19, 0.55)'
  }
};

export default function HeroPhoneShowcase({ activeColor, setActiveColor }) {
  const { addToCart } = useCart();
  const { generateSingleProductWhatsAppURL } = useOrder();

  const activeColorData = COLOR_IMAGE_MAP[activeColor] || COLOR_IMAGE_MAP['#c5b49e'];
  const baseProduct = PRODUCTS[0];

  const handleQuickAdd = () => {
    addToCart(baseProduct, { name: activeColorData.name, hex: activeColor }, 'iPhone 16 Pro Max', '', 1);
  };

  const handleWhatsApp = () => {
    const url = generateSingleProductWhatsAppURL(
      baseProduct,
      { name: activeColorData.name, hex: activeColor },
      'iPhone 16 Pro Max'
    );
    window.open(url, '_blank');
  };

  return (
    <div
      className="relative w-full h-full min-h-[560px] rounded-3xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 bg-cover bg-center text-white shadow-2xl border border-amber-500/30 transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(12, 10, 7, 0.4), rgba(12, 10, 7, 0.9)), url('/images/desert-gold-bg.png')`
      }}
    >
      {/* Top Floating Badges */}
      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{activeColorData.badge}</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold backdrop-blur-md">
          iPhone 16 Pro Max
        </span>
      </div>

      {/* Main Dynamic Phone Case Image Stage - Significantly Increased Size */}
      <div className="relative my-auto flex items-center justify-center py-2 z-10 w-full">
        <div className="relative group w-full max-w-[560px] transition-all duration-500 transform hover:scale-[1.015]">
          {/* Dynamic Ambient Glow Behind Selected Color */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl transition-colors duration-700 pointer-events-none opacity-60"
            style={{ backgroundColor: activeColorData.glow }}
          />

          {/* Dynamic Image Container - Large & Immersive */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 ring-1 ring-white/15 bg-black/50">
            <img
              key={activeColor}
              src={activeColorData.image}
              alt={activeColorData.name}
              className="relative z-10 w-full h-[300px] sm:h-[350px] md:h-[370px] object-cover transition-all duration-500 animate-in fade-in zoom-in-95"
            />

            {/* MagSafe Badge Overlay */}
            <div className="absolute bottom-3 right-3 z-20 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 shadow-xl">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> 15W Qi2 MagSafe
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Color Switcher Bar & Instant Purchase */}
      <div className="z-10 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 shadow-xl mt-2">
        {/* Color Details Header */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">Selected Finish:</span>
            <strong className="text-amber-300 font-bold text-sm tracking-tight">{activeColorData.name}</strong>
          </div>
          <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock (₹2,499)
          </span>
        </div>

        {/* Color Palette Swatches (5 Titanium Colors) - Clean Full Row on Mobile, Actions on Desktop */}
        <div className="flex items-center justify-center sm:justify-between gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            {COLOR_OPTIONS.map((col) => {
              const isSelected = activeColor === col.hex;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveColor && setActiveColor(col.hex)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 min-w-[32px] min-h-[32px] rounded-full border-2 transition-all transform hover:scale-115 flex items-center justify-center cursor-pointer shadow-md shrink-0 ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-400/80 scale-110 shadow-lg shadow-amber-400/30'
                      : 'border-white/50 hover:border-white'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                  aria-label={col.name}
                >
                  {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Direct Actions: Hidden on mobile view alone, available on desktop */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm items-center justify-center"
              title="Order this color via WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
