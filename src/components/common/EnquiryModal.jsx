import React, { useState } from 'react';
import { X, Send, MessageSquare, Building, CheckCircle2 } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, triggerConfetti } = useOrder();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    enquiryType: 'Corporate / Bulk iPhone Cases (10+ Units)',
    targetModel: 'iPhone 16 Pro Max',
    estimatedQuantity: '25-50 Units (25% Off)',
    message: ''
  });

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  const handleWhatsAppEnquiry = () => {
    const supportPhone = '919384694189';
    const text = `👋 Hello Case Matrix! Bulk iPhone Enquiry from ${formData.name || 'Client'}:\n\n• Type: ${formData.enquiryType}\n• Model: ${formData.targetModel}\n• Quantity: ${formData.estimatedQuantity}\n• Email/Phone: ${formData.email || ''} / ${formData.phone || ''}\n• Requirements: ${formData.message || 'Need quote for custom laser branding'}`;
    window.open(`https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">iPhone Bulk & Custom Order Quote</h3>
              <p className="text-xs text-slate-500">Custom logo laser engraving & GST invoice in India</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsEnquiryModalOpen(false);
              setSubmitted(false);
            }}
            className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Enquiry Received!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out. Our account manager will review your specs and email you a tailored quotation in INR with GST breakdown within 4 hours.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> Follow Up on WhatsApp Now
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Your Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Rohan Mehra"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Infosys / Tech Startup"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Work Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rohan@company.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">WhatsApp / Phone *</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 93846 94189"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Enquiry Type</label>
                <select
                  value={formData.enquiryType}
                  onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                >
                  <option value="Corporate Bulk Order">Corporate Bulk Order</option>
                  <option value="Custom Logo Laser Engraving">Custom Logo Laser Engraving</option>
                  <option value="Distributor / Wholesale India">Distributor / Wholesale India</option>
                  <option value="Special iPhone Accessory Request">Special iPhone Accessory Request</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Est. Quantity</label>
                <select
                  value={formData.estimatedQuantity}
                  onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
                >
                  <option value="10-25 Units">10-25 Units (15% Off)</option>
                  <option value="25-50 Units">25-50 Units (25% Off)</option>
                  <option value="50-100 Units">50-100 Units (35% Off)</option>
                  <option value="100+ Units">100+ Units (Custom OEM Quote)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Project Details / Requirements</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Specify iPhone models (e.g. 50x iPhone 16 Pro Max in Desert Gold with company laser logo), delivery timeline, etc."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
              >
                <Send className="w-3.5 h-3.5" /> Submit Enquiry
              </button>
              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Direct
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
