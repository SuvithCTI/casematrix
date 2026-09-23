import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, QrCode, Truck, Check, MessageSquare, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

export default function CheckoutModal() {
  const { cartItems, subtotal, discountAmount, shippingFee, total, appliedPromoName, clearCart } = useCart();
  const { isCheckoutModalOpen, setIsCheckoutModalOpen, createOrder, generateWhatsAppOrderURL } = useOrder();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
    paymentMethod: 'Instant UPI / QR Code',
    notes: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStandardOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.postalCode) {
      alert('Please fill in all required shipping and contact fields.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      createOrder(formData, cartItems, { subtotal, discountAmount, shippingFee, total, appliedPromoName });
      clearCart();
      setIsProcessing(false);
      setIsCheckoutModalOpen(false);
    }, 1200);
  };

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderURL(
      cartItems,
      { subtotal, discountAmount, shippingFee, total },
      formData,
      formData.notes
    );
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> 256-Bit Encrypted Secure Checkout
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Complete Your iPhone Order</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleStandardOrder} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick WhatsApp Order Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" /> 1-Click WhatsApp Express Order
              </h4>
              <p className="text-xs text-emerald-800/90 mt-0.5">
                Send your iPhone cart directly to our team via WhatsApp for instant order booking and UPI link.
              </p>
            </div>
            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              Order on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Shipping Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" /> 1. Delivery Address (India)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">WhatsApp Mobile Number *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 93846 94189"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul@gmail.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Flat / House No. & Street Address *</label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Flat 402, Signature Tower, MG Road"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">City *</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Karnataka">Karnataka (Bangalore)</option>
                  <option value="Tamil Nadu">Tamil Nadu (Chennai)</option>
                  <option value="Telangana">Telangana (Hyderabad)</option>
                  <option value="Gujarat">Gujarat (Ahmedabad/Surat)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal (Kolkata)</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">PIN Code *</label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="400001"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600" /> 2. Payment Method
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'Instant UPI / QR Code', icon: QrCode, subtitle: 'GPay, PhonePe, Paytm' },
                { id: 'Credit / Debit Card', icon: CreditCard, subtitle: 'Visa, RuPay, MasterCard' },
                { id: 'Cash On Delivery', icon: Truck, subtitle: 'Pay upon delivery' },
              ].map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: pm.id }))}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    formData.paymentMethod === pm.id
                      ? 'bg-amber-50 border-amber-500 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <pm.icon className={`w-5 h-5 ${formData.paymentMethod === pm.id ? 'text-amber-600' : 'text-slate-500'}`} />
                    {formData.paymentMethod === pm.id && <Check className="w-4 h-4 text-amber-600 font-bold" />}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-bold text-slate-900">{pm.id}</p>
                    <p className="text-[10px] text-slate-500">{pm.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Pill */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Items ({cartItems.length}):</span>
              <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount ({appliedPromoName}):</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery (India):</span>
              <span className="font-semibold text-slate-900">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span className="text-amber-800">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-lg shadow-amber-600/20 transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Confirming Order...
              </>
            ) : (
              <>
                Confirm & Place Order (₹{total.toLocaleString('en-IN')}) <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
