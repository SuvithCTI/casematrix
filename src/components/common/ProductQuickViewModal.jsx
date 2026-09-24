import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingBag, Sparkles, MessageSquare, Check } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';

export default function ProductQuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, openCustomizer } = useProduct();
  const { addToCart } = useCart();
  const { generateSingleProductWhatsAppURL, createOrder } = useOrder();
  const { currentUser, recordCustomerFromCheckout } = useAuth();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!quickViewProduct) return null;

  const activeColor = selectedColor || quickViewProduct.colors?.[0];
  const activeModel = selectedModel || quickViewProduct.compatibleModels?.[0] || 'iPhone 16 Pro Max';
  const displayImage = selectedImage || activeColor?.image || quickViewProduct.image;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeColor, activeModel, '', 1);
    setQuickViewProduct(null);
  };

  const handleOpenCustomizer = () => {
    openCustomizer(quickViewProduct, activeColor, activeModel);
    setQuickViewProduct(null);
    const studio = document.getElementById('customizer-studio-section');
    if (studio) studio.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
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
            id: quickViewProduct.id,
            name: quickViewProduct.name,
            price: quickViewProduct.price,
            image: displayImage,
            model: activeModel,
            selectedModel: activeModel,
            color: activeColor,
            quantity: 1
          }
        ],
        { subtotal: quickViewProduct.price, discountAmount: 0, shippingFee: 0, total: quickViewProduct.price }
      );
    }
    if (recordCustomerFromCheckout && currentUser) {
      recordCustomerFromCheckout(customer);
    }
    const url = generateSingleProductWhatsAppURL(quickViewProduct, activeColor, activeModel);
    setQuickViewProduct(null);
    window.open(url, '_blank');
  };

  const handleColorChange = (c) => {
    setSelectedColor(c);
    if (c.image) {
      setSelectedImage(c.image);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        <button
          type="button"
          onClick={() => {
            setQuickViewProduct(null);
            setSelectedImage(null);
            setSelectedColor(null);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Gallery / Image View (Left) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center group">
              <img
                src={displayImage}
                alt={quickViewProduct.name}
                className={`w-full h-full ${quickViewProduct.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'} group-hover:scale-105 transition duration-500`}
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel for Multiple Images */}
            {(() => {
              const galleryList = quickViewProduct.gallery || quickViewProduct.images || [];
              if (galleryList.length <= 1) return null;
              return (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryList.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        displayImage === img ? 'border-amber-600 ring-2 ring-amber-500/30 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Details & Selection (Right) */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold mb-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-extrabold text-slate-900">{quickViewProduct.rating}</span>
                <span className="text-slate-600 font-semibold">({quickViewProduct.reviewsCount} reviews)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">{quickViewProduct.name}</h3>
              <p className="text-xs text-amber-800 font-bold mt-1">{quickViewProduct.tagline}</p>
            </div>

            {/* Price in INR */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-slate-900">₹{quickViewProduct.price.toLocaleString('en-IN')}</span>
              {quickViewProduct.originalPrice && (
                <span className="text-slate-500 line-through text-sm font-medium">₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                In Stock & Fast Dispatch
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-700 font-medium leading-relaxed">{quickViewProduct.description}</p>

            {/* Model Selector */}
            {quickViewProduct.compatibleModels && (
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Select iPhone Model
                </label>
                <select
                  value={activeModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-bold"
                >
                  {quickViewProduct.compatibleModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Colors with Real-Time Image Switching */}
            {quickViewProduct.colors && (
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Color: <span className="text-amber-800 font-extrabold">{activeColor?.name}</span>
                </label>
                <div className="flex gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleColorChange(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        activeColor?.name === c.name ? 'border-amber-600 ring-2 ring-amber-500/30 scale-110 shadow-xs' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {activeColor?.name === c.name && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features Bullet points */}
            {quickViewProduct.features && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                {quickViewProduct.features.slice(0, 3).map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" /> Add to Bag
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Order
                </button>
              </div>

              {quickViewProduct.isCustomizable && (
                <button
                  type="button"
                  onClick={handleOpenCustomizer}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Customize Case & Laser Engrave
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
