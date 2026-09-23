import React, { useState } from 'react';
import { Star, ShoppingBag, MessageSquare, Sparkles, Smartphone } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export default function MobileProductCard({ product }) {
  const { setQuickViewProduct, openCustomizer } = useProduct();
  const { addToCart } = useCart();
  const { generateSingleProductWhatsAppURL } = useOrder();

  const [activeColor, setActiveColor] = useState(product.colors ? product.colors[0] : null);
  const [activeModel, setActiveModel] = useState(product.targetModel || (product.compatibleModels ? product.compatibleModels[0] : 'iPhone 16 Pro Max'));

  // Color-reactive image switching
  const currentImage = activeColor?.image || product.image;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, activeColor, activeModel, '', 1);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppURL(product, activeColor, activeModel);
    window.open(url, '_blank');
  };

  const handleOpenCustomizer = (e) => {
    e.stopPropagation();
    openCustomizer(product, activeColor, activeModel);
    const studio = document.getElementById('customizer-studio-section');
    if (studio) studio.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="rounded-2xl bg-white border border-slate-200 p-3 flex flex-col justify-between shadow-xs active:bg-slate-50 transition cursor-pointer"
    >
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-square w-full rounded-xl bg-slate-50 overflow-hidden mb-2 flex items-center justify-center border border-slate-100">
          <img src={currentImage} alt={product.name} className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain p-1' : 'object-cover'} transition-all duration-300`} />

          {product.badge && (
            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-extrabold">
              {product.badge}
            </span>
          )}

          {product.isCustomizable && (
            <button
              type="button"
              onClick={handleOpenCustomizer}
              className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-amber-600 text-white text-[9px] font-bold flex items-center gap-1 shadow-xs"
            >
              <Sparkles className="w-2.5 h-2.5" /> Customize
            </button>
          )}
        </div>

        {/* Model Match Pill */}
        {product.targetModel && (
          <div className="mb-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/60 text-[9px] font-bold text-amber-900 truncate max-w-full">
              <Smartphone className="w-2.5 h-2.5 text-amber-600 shrink-0" />
              <span className="truncate">{product.targetModel}</span>
            </span>
          </div>
        )}

        {/* Rating & Series */}
        <div className="flex items-center justify-between text-[10px] mb-1">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="w-3 h-3 fill-amber-500" />
            <span className="font-bold text-slate-900">{product.rating}</span>
            <span className="text-slate-600 font-semibold">({product.reviewsCount})</span>
          </div>
          <span className="text-amber-800 font-bold text-[9px]">MagSafe</span>
        </div>

        {/* Name */}
        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{product.name}</h4>
      </div>

      {/* Colors & Price */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-2">
        {/* Color Bubbles with Real-Time Switching */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(c);
                }}
                className={`w-3.5 h-3.5 rounded-full border shrink-0 transition-transform ${
                  activeColor?.name === c.name ? 'border-amber-600 scale-125 ring-1 ring-amber-500/40' : 'border-slate-300'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-1 pt-1">
          <div>
            <span className="text-xs sm:text-sm font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-[9px] text-slate-500 font-medium line-through block leading-none">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition active:scale-95 shrink-0"
              title="Order on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="h-8 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 active:scale-95 transition shrink-0 shadow-xs"
            >
              <ShoppingBag className="w-3 h-3 text-amber-400" /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
