import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export default function MobileContactView() {
  const { triggerConfetti, setIsEnquiryModalOpen } = useOrder();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  const handleWhatsApp = () => {
    const supportPhone = '919384694189';
    const text = `Hi Case Matrix! I'm ${formData.name || 'a customer'} needing assistance with iPhone cases in India.`;
    window.open(`https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 px-4 py-4 pb-28">
      {/* Header Banner */}
      <div
        className="rounded-2xl p-5 text-white text-center border border-amber-500/30 shadow-md space-y-1"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 12, 8, 0.88), rgba(15, 12, 8, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover'
        }}
      >
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
          <MessageSquare className="w-3 h-3 text-amber-400" /> Concierge Help (India)
        </span>
        <h2 className="text-2xl font-black text-white">Contact & Support</h2>
        <p className="text-xs text-slate-300">Available 24/7 on WhatsApp with Instant UPI Ordering</p>
      </div>

      {/* WhatsApp Quick Action Button */}
      <div
        className="p-4 rounded-2xl text-white text-center space-y-2 border border-emerald-500/40 shadow-sm"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 78, 59, 0.92), rgba(15, 23, 42, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover'
        }}
      >
        <h4 className="text-xs font-bold text-white">Instant WhatsApp Chat</h4>
        <p className="text-[11px] text-slate-200">Fastest response for iPhone sizing and custom orders</p>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
        >
          <MessageSquare className="w-4 h-4" /> Message on WhatsApp (+91 93846 94189)
        </button>
      </div>

      {/* Contact Form in Light Theme */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Message Received!</h3>
            <p className="text-xs text-slate-600">We will respond within 2 hours.</p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Leave a Message</h4>
            <div>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name *"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>
            <div>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address *"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>
            <div>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help with your iPhone setup? *"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Submit Enquiry
            </button>
          </form>
        )}
      </div>

      {/* Direct Details */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 shadow-xs">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-700" />
          <span>support@casematrix.in</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-700" />
          <span>Mumbai • Bengaluru • Delhi NCR, India</span>
        </div>
      </div>
    </div>
  );
}
