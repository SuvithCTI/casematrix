import React from 'react';
import InteractiveCaseViewer from '../../components/common/InteractiveCaseViewer';
import { useProduct } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { Sparkles, ShoppingBag, MessageSquare, Check, ShieldCheck, Zap, Layers, Type } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { COLOR_OPTIONS, IPHONE_MODELS } from '../../data/categories';

export default function DesktopCustomizerView() {
  const {
    activeCustomizerProduct,
    setActiveCustomizerProduct,
    customizerColor,
    setCustomizerColor,
    customizerModel,
    setCustomizerModel,
    customizerFinish,
    setCustomizerFinish,
    customizerEngraving,
    setCustomizerEngraving,
  } = useProduct();

  const { addToCart } = useCart();
  const { generateSingleProductWhatsAppURL } = useOrder();

  const customizableCases = PRODUCTS.filter(p => p.isCustomizable || p.category === 'cases');

  const finishes = [
    { id: 'matte', name: 'Matte Titanium Ceramic', desc: 'Satin anti-fingerprint coating' },
    { id: 'gloss', name: 'High-Gloss Titanium', desc: 'Mirror finish reflective sheen' },
    { id: 'carbon', name: 'Forged Carbon Fiber', desc: 'Real weave lightweight armor' },
    { id: 'leather', name: 'Italian Saddle Leather', desc: 'Supple vegetable-tanned grain' },
  ];

  const handleAddToCart = () => {
    addToCart(
      activeCustomizerProduct,
      customizerColor,
      customizerModel,
      customizerEngraving,
      1
    );
  };

  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppURL(
      activeCustomizerProduct,
      customizerColor,
      customizerModel,
      customizerEngraving
    );
    window.open(url, '_blank');
  };

  return (
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8 space-y-10">
      {/* Studio Banner with Silk Waves Background */}
      <div
        className="rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-amber-500/30 text-center max-w-5xl mx-auto"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 12, 8, 0.85), rgba(15, 12, 8, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" /> Case Matrix Custom iPhone Lab
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Custom iPhone Case Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mt-2">
          Design your bespoke iPhone case with precision finish textures, aerospace Grade 5 titanium buttons, MagSafe alignment, and complimentary personalized laser name engraving in ₹ INR.
        </p>
      </div>

      {/* Case Style Switcher Pill Bar */}
      <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2">
        {customizableCases.map((caseItem) => (
          <button
            key={caseItem.id}
            type="button"
            onClick={() => {
              setActiveCustomizerProduct(caseItem);
              if (caseItem.colors && caseItem.colors[0]) {
                setCustomizerColor(caseItem.colors[0]);
              }
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeCustomizerProduct.id === caseItem.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{caseItem.name.replace('AURA™ ', 'Case Matrix™ ')}</span>
          </button>
        ))}
      </div>

      {/* Main Two-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 2D Visualizer */}
        <div className="lg:col-span-7">
          <InteractiveCaseViewer
            product={activeCustomizerProduct}
            activeColor={customizerColor?.hex || '#c5b49e'}
            model={customizerModel}
            finish={customizerFinish}
            engravingText={customizerEngraving}
          />
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Product Title & Pricing */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                Custom Edition
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Free Laser Engraving
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {activeCustomizerProduct.name}
            </h2>
            <div className="flex items-baseline gap-2.5 mt-2">
              <span className="text-2xl font-black text-amber-800">
                ₹{activeCustomizerProduct.price.toLocaleString('en-IN')}
              </span>
              {activeCustomizerProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{activeCustomizerProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* 1. iPhone Model Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">1. Select iPhone Model:</label>
            <select
              value={customizerModel}
              onChange={(e) => setCustomizerModel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-600 focus:bg-white"
            >
              {IPHONE_MODELS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.screenSize})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">2. Titanium & Palette Color:</span>
              <span className="text-amber-700 font-bold">{customizerColor?.name || 'Desert Titanium'}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_OPTIONS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setCustomizerColor(col)}
                  className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 flex items-center justify-center ${
                    customizerColor?.id === col.id ? 'border-amber-600 ring-2 ring-amber-500/40 scale-110' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {customizerColor?.id === col.id && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Finish / Material Texture Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">3. Surface Material / Finish:</label>
            <div className="grid grid-cols-2 gap-2">
              {finishes.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setCustomizerFinish(f.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition text-left ${
                    customizerFinish === f.id
                      ? 'bg-amber-50 border-amber-600 text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{f.name}</p>
                  <p className="text-[10px] text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Laser Monogram Engraving */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-amber-600" /> 4. Custom Laser Text Engraving:
              </span>
              <span className="text-[10px] text-amber-700 font-bold font-mono">MAX 18 CHARS</span>
            </div>
            <input
              type="text"
              maxLength={18}
              value={customizerEngraving}
              onChange={(e) => setCustomizerEngraving(e.target.value)}
              placeholder="e.g. AARAV • DESIGN STUDIO"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono tracking-wider focus:outline-none focus:border-amber-600 focus:bg-white uppercase"
            />
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" /> Add Customized Case to Cart (₹{activeCustomizerProduct.price.toLocaleString('en-IN')})
            </button>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" /> Order Custom Case on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
