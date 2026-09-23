import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export default function DesktopCartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    promoCode,
    setPromoCode,
    applyPromoCode,
    appliedPromoName,
    removePromoCode,
    shippingThreshold,
  } = useCart();

  const { setIsCheckoutModalOpen, generateWhatsAppOrderURL } = useOrder();
  const [promoMsg, setPromoMsg] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const res = applyPromoCode(promoCode);
    setPromoMsg(res);
  };

  const freeShippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderURL(cartItems, { subtotal, discountAmount, shippingFee, total });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-extrabold text-slate-900">Your iPhone Bag</h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator in INR */}
          <div className="bg-amber-50/50 px-6 py-3 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 font-medium">
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> FREE Express Shipping Unlocked across India!
                  </strong>
                ) : (
                  <>Add <strong className="text-amber-800">₹{remainingForFreeShipping}</strong> more for Free Shipping</>
                )}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Your bag is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our aerospace titanium iPhone cases and MagSafe wireless gear.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold transition shadow-sm"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-3 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.model} • <span className="text-amber-800 font-bold">{item.color?.name}</span>
                    </p>

                    {item.engraving && (
                      <p className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded w-fit mt-1 font-semibold">
                        Laser: "{item.engraving}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, -1)}
                          className="p-1 text-slate-500 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 px-1">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, 1)}
                          className="p-1 text-slate-500 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Totals & Checkout in INR */}
          {cartItems.length > 0 && (
            <div className="bg-slate-50 p-6 border-t border-slate-200 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (IPHONE20)..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 uppercase placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </div>
                {promoMsg && (
                  <p className={`text-[11px] font-semibold ${promoMsg.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoMsg.message}
                  </p>
                )}
                {appliedPromoName && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-bold pt-1">
                    <span>Active Promo: <strong>{appliedPromoName}</strong></span>
                    <button type="button" onClick={removePromoCode} className="text-rose-600 hover:underline">
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Subtotal & Total Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-slate-900">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total:</span>
                  <span className="text-amber-700">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleOpenCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition transform active:scale-95"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Quick WhatsApp Checkout
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine Apple Compatibility • Free 2-Year Warranty
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
