import React from 'react';
import InteractiveCaseViewer from '../../components/common/InteractiveCaseViewer';
import { useProduct } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { Sparkles, ShoppingBag, MessageSquare, Check, Type } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { COLOR_OPTIONS, IPHONE_MODELS } from '../../data/categories';

export default function MobileCustomizerView() {
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
    { id: 'matte', name: 'Matte Titanium' },
    { id: 'gloss', name: 'High-Gloss' },
    { id: 'carbon', name: 'Forged Carbon' },
    { id: 'leather', name: 'Italian Leather' },
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
    <div className="space-y-4 px-4 py-4 pb-28">
      {/* Title Banner */}
      <div
        className="rounded-2xl p-4 text-center text-white border border-amber-500/30 shadow-md space-y-1"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 12, 8, 0.88), rgba(15, 12, 8, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover'
        }}
      >
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Case Matrix Custom Lab
        </span>
        <h2 className="text-xl font-black text-white">iPhone Case Customizer</h2>
        <p className="text-[11px] text-slate-300">Live preview finishes, MagSafe alignment & free laser text in ₹</p>
      </div>

      {/* Model Quick Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
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
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 transition ${
              activeCustomizerProduct.id === caseItem.id
                ? 'bg-amber-600 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 shadow-2xs'
            }`}
          >
            {caseItem.name.replace('AURA™ ', 'Case Matrix™ ').slice(0, 18)}
          </button>
        ))}
      </div>

      {/* 2D Interactive Case Viewer */}
      <InteractiveCaseViewer
        product={activeCustomizerProduct}
        activeColor={customizerColor?.hex || '#c5b49e'}
        model={customizerModel}
        finish={customizerFinish}
        engravingText={customizerEngraving}
      />

      {/* Customizer Controls Panel */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-4 shadow-xs">
        {/* Model Selection */}
        <div>
          <label className="text-[11px] font-bold text-slate-800 block mb-1">Select iPhone Model:</label>
          <select
            value={customizerModel}
            onChange={(e) => setCustomizerModel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-600 focus:bg-white"
          >
            {IPHONE_MODELS.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name} ({m.screenSize})
              </option>
            ))}
          </select>
        </div>

        {/* Color Palette */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-bold text-slate-800">Titanium Finish Color:</span>
            <span className="text-amber-700 font-bold">{customizerColor?.name || 'Desert Gold'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => setCustomizerColor(col)}
                className={`w-7 h-7 rounded-full border transition transform hover:scale-110 flex items-center justify-center ${
                  customizerColor?.id === col.id ? 'border-amber-600 ring-2 ring-amber-500/40 scale-110' : 'border-slate-300'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              >
                {customizerColor?.id === col.id && (
                  <Check className="w-3 h-3 text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Finish Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-800 block mb-1">Surface Finish:</label>
          <div className="grid grid-cols-2 gap-1.5">
            {finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCustomizerFinish(f.id)}
                className={`py-2 px-2.5 rounded-xl border text-xs font-bold text-left transition ${
                  customizerFinish === f.id
                    ? 'bg-amber-50 border-amber-600 text-slate-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Laser Engraving */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-amber-600" /> Free Laser Text:
            </span>
            <span className="text-[10px] text-amber-700 font-mono font-bold">18 CHARS MAX</span>
          </div>
          <input
            type="text"
            maxLength={18}
            value={customizerEngraving}
            onChange={(e) => setCustomizerEngraving(e.target.value)}
            placeholder="e.g. VIP • TITANIUM"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono uppercase tracking-wider focus:outline-none focus:border-amber-600 focus:bg-white"
          />
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" /> Add to Cart (₹{activeCustomizerProduct.price.toLocaleString('en-IN')})
          </button>
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageSquare className="w-4 h-4" /> Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
