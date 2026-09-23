import React from 'react';
import { X, CheckCircle2, Printer, MessageSquare, Package, Shield } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export default function OrderReceiptModal() {
  const { activeOrderReceipt, setActiveOrderReceipt } = useOrder();

  if (!activeOrderReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppStatus = () => {
    const supportPhone = '919384694189';
    const text = `Hi Case Matrix Team! I just placed iPhone accessory order *#${activeOrderReceipt.orderId}* for ₹${activeOrderReceipt.pricing.total.toLocaleString('en-IN')}. Please confirm dispatch timeframe.`;
    window.open(`https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 p-6 text-white text-center relative">
          <button
            type="button"
            onClick={() => setActiveOrderReceipt(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">iPhone Order Confirmed!</h3>
          <p className="text-xs text-amber-100 mt-1">
            Order Reference: <span className="font-mono font-bold bg-black/20 px-2 py-0.5 rounded-md text-white">{activeOrderReceipt.orderId}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Status Box */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-600" />
              <span>Status: <strong>{activeOrderReceipt.status}</strong></span>
            </div>
            <span className="font-medium">Est. Delivery: 2-3 Days (India)</span>
          </div>

          {/* Customer & Address details */}
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-500 block uppercase font-semibold text-[10px] mb-1">Delivering to:</span>
              <p className="font-bold text-slate-900">{activeOrderReceipt.customer.name}</p>
              <p>{activeOrderReceipt.customer.address}</p>
              <p>{activeOrderReceipt.customer.city}, {activeOrderReceipt.customer.state} - {activeOrderReceipt.customer.postalCode}</p>
              <p className="text-amber-700 font-semibold mt-1">{activeOrderReceipt.customer.phone}</p>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-semibold text-[10px] mb-1">Payment Method:</span>
              <p className="font-bold text-slate-900">{activeOrderReceipt.paymentMethod}</p>
              <span className="text-slate-500 block uppercase font-semibold text-[10px] mt-3 mb-1">Order Date:</span>
              <p className="text-slate-700">{new Date(activeOrderReceipt.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Items Purchased:</span>
            {activeOrderReceipt.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white" />
                  <div>
                    <h5 className="font-bold text-slate-900">{item.name}</h5>
                    <p className="text-slate-500">{item.model} • {item.color?.name}</p>
                    {item.engraving && <p className="text-amber-700 font-medium text-[11px]">Laser: "{item.engraving}"</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  <p className="text-slate-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-slate-900">₹{activeOrderReceipt.pricing.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {activeOrderReceipt.pricing.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>VIP Discount:</span>
                <span>-₹{activeOrderReceipt.pricing.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery:</span>
              <span className="font-medium text-slate-900">{activeOrderReceipt.pricing.shipping === 0 ? 'FREE' : `₹${activeOrderReceipt.pricing.shipping}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Paid:</span>
              <span className="text-amber-800 font-black">₹{activeOrderReceipt.pricing.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleWhatsAppStatus}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" /> Get WhatsApp Updates
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print / Save Tax Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
