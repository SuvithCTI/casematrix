import React, { useState } from 'react';
import { Star, Sparkles, Eye, ShoppingBag, MessageSquare, Smartphone } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

export default function DesktopProductCard({ product }) {
  const { setQuickViewProduct, openCustomizer } = useProduct();
  const { addToCart } = useCart();
  const { generateSingleProductWhatsAppURL, createOrder } = useOrder();
  const { currentUser, recordCustomerFromCheckout } = useAuth();

  const [activeColor, setActiveColor] = useState(product.colors ? product.colors[0] : null);
  const [activeModel, setActiveModel] = useState(product.targetModel || (product.compatibleModels ? product.compatibleModels[0] : 'iPhone 16 Pro Max'));

  // Color-reactive image switching
  const currentImage = activeColor?.image || product.image;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, activeColor, activeModel, '', 1);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const customer = {
      name: currentUser?.name || 'Storefront Visitor',
      email: currentUser?.email || 'customer@casematrix.in',
      phone: currentUser?.phone || '+91 93846 94189',
      address: 'WhatsApp Direct Order',
      city: 'Express Avenue',
      state: 'Tamil Nadu',
      postalCode: '600002',
      country: 'India',
      paymentMethod: 'WhatsApp Express Order (UPI)'
    };
    if (createOrder) {
      createOrder(
        customer,
        [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: currentImage,
            model: activeModel,
            selectedModel: activeModel,
            color: activeColor,
            quantity: 1
          }
        ],
        { subtotal: product.price, discountAmount: 0, shippingFee: 0, total: product.price }
      );
    }
    if (recordCustomerFromCheckout && currentUser) {
      recordCustomerFromCheckout(customer);
    }
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
      className="group relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-2.5 sm:p-5 shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Stage */}
      <div>
        <div className="relative aspect-[4/3.8] sm:aspect-[4/4.2] w-full rounded-xl sm:rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center p-1.5 sm:p-3 mb-1.5 sm:mb-3 border border-slate-100">
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain p-1' : 'object-cover'} rounded-lg sm:rounded-xl group-hover:scale-103 transition-all duration-300`}
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-900 text-white text-[8px] sm:text-[10px] font-extrabold shadow-xs">
              {product.badge}
            </span>
          )}

          {/* Quick View Hover Trigger */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setQuickViewProduct(product)}
              className="p-2.5 px-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 transition shadow-lg font-bold text-xs flex items-center gap-1.5"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
            {product.isCustomizable && (
              <button
                type="button"
                onClick={handleOpenCustomizer}
                className="p-2.5 px-3 rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition shadow-lg font-black text-xs flex items-center gap-1.5"
                title="Customize Case"
              >
                <Sparkles className="w-3.5 h-3.5" /> Customize
              </button>
            )}
          </div>
        </div>

        {/* Model Match Tag & Rating */}
        <div className="flex items-center justify-between gap-1 text-xs mb-1 sm:mb-1.5">
          {product.targetModel ? (
            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-[8.5px] sm:text-[10px] font-bold text-amber-900 truncate max-w-[80px] sm:max-w-none">
              <Smartphone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 shrink-0" />
              <span className="truncate">{product.targetModel}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-md bg-slate-100 text-[8.5px] sm:text-[10px] font-bold text-slate-700">
              MagSafe
            </span>
          )}

          <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 shrink-0">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500" />
            <span className="font-bold text-slate-900 text-[9.5px] sm:text-[11px]">{product.rating}</span>
            <span className="text-slate-600 font-semibold text-[9px] sm:text-[10px] hidden sm:inline">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-[11px] sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition cursor-pointer line-clamp-1 leading-snug"
        >
          {product.name}
        </h3>
        <p className="hidden sm:block text-xs text-slate-700 font-medium line-clamp-2 mt-0.5 leading-relaxed">
          {product.tagline || product.description}
        </p>
      </div>

      {/* Footer Details: Color Swatches, Price & Quick Actions */}
      <div className="mt-1.5 sm:mt-4 pt-1.5 sm:pt-3 border-t border-slate-100 space-y-1.5 sm:space-y-3">
        {/* Interactive Real-Time Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-0.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColor(c);
                  }}
                  className={`w-3 h-3 sm:w-5 sm:h-5 rounded-full border shrink-0 transition-all ${
                    activeColor?.name === c.name ? 'border-amber-600 scale-125 ring-2 ring-amber-500/40 shadow-xs' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`Select ${c.name}`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[11px] text-slate-800 truncate max-w-[80px] sm:max-w-[130px] font-bold hidden sm:inline">
              {activeColor?.name || ''}
            </span>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-lg font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-[9px] sm:text-[11px] text-slate-500 font-medium line-through hidden sm:inline">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 transition active:scale-95"
              title="Order on WhatsApp"
            >
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-2 sm:px-3.5 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[9.5px] sm:text-xs font-bold transition flex items-center gap-1 shadow-xs active:scale-95"
            >
              <ShoppingBag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-400" /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
