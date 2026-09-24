import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { IPHONE_MODELS_BY_SERIES } from '../../data/categories';

export default function DesktopContactView() {
  const { triggerConfetti, setIsEnquiryModalOpen } = useOrder();
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    iphoneModel: 'iPhone 16 Pro Max',
    subject: 'General Question',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  const handleWhatsAppChat = () => {
    const supportPhone = '919384694189';
    const text = `Hi Case Matrix Support! I am ${formData.name || 'a customer'} inquiring about ${formData.subject} for ${formData.iphoneModel}.`;
    window.open(`https://wa.me/${supportPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'Are your cases 100% compatible with iPhone 16 Camera Control Button?',
      a: 'Yes! All of our iPhone 16 series cases feature a sapphire-conductive capacitive cutout or precision tactile mechanical bridge that guarantees full swipe and light-press sensitivity on the new Camera Control button.'
    },
    {
      q: 'Will the Lumina Clear case turn yellow in Indian weather?',
      a: 'No. We use German Bayer anti-UV polymer molecules that resist discoloration from tropical heat, humidity, skin oils, and sweat. We back this with our 24-Month Zero-Yellowing Replacement Guarantee.'
    },
    {
      q: 'How fast is delivery across India and is Cash on Delivery available?',
      a: 'Orders are dispatched within 24 hours via Bluedart / Delhivery Express. Delivery takes 2-4 business days across all major Indian cities. We support UPI, Cards, and Cash on Delivery (COD).'
    },
    {
      q: 'How does WhatsApp ordering work in India?',
      a: 'You can build your cart on our website and click "Order on WhatsApp" or message our concierge directly. We will confirm your iPhone model, delivery address, and provide instant UPI QR code payment confirmation.'
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header Banner with Desert Gold Waves Background */}
      <div
        className="rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden border border-amber-500/30 text-center max-w-5xl mx-auto"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 12, 8, 0.85), rgba(15, 12, 8, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 24/7 iPhone Concierge & B2B Desk
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Get in Touch with Case Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
          Have questions about iPhone 16 compatibility, custom corporate logo engraving, or bulk orders? Connect with our dedicated Indian team via WhatsApp or message form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full">
        {/* Contact Info & WhatsApp Hotline (Left 5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Highlight Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Direct WhatsApp Concierge</h4>
                <p className="text-xs text-emerald-300">Average response time: &lt; 5 minutes</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer chatting directly on your phone? Chat with our specialist for instant iPhone model advice and custom order confirmation via UPI.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppChat}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
                <MessageSquare className="w-4 h-4" /> Open WhatsApp (+91 93846 94189)
            </button>
          </div>

          {/* Contact Details List (2 Columns on Mobile) */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs grid grid-cols-2 lg:grid-cols-1 gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3.5 text-xs text-slate-700">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <p className="text-slate-600 uppercase font-bold text-[9px] sm:text-[10px]">Email Support</p>
                <p className="font-extrabold text-slate-900 text-[11px] sm:text-xs truncate">support@casematrix.in</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 text-xs text-slate-700">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <p className="text-slate-600 uppercase font-bold text-[9px] sm:text-[10px]">Helpline</p>
                <p className="font-extrabold text-slate-900 text-[11px] sm:text-xs">+91 93846 94189</p>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex items-start gap-2.5 sm:gap-3.5 text-xs text-slate-700 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold mt-0.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <p className="text-slate-600 uppercase font-bold text-[9px] sm:text-[10px]">Experience Center & Flagship Store</p>
                <p className="font-extrabold text-slate-900 text-[11px] sm:text-xs leading-relaxed">
                  Express Avenue, 17, Pattullos Rd, Express Estate, Thousand Lights, Chennai, Tamil Nadu - 600014
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Right 7 columns) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-700 font-medium max-w-sm mx-auto">
                  Thank you for contacting Case Matrix. Our team has received your message and will respond to {formData.email} within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Send Us a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Aditya Verma"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aditya@icloud.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Your iPhone Model</label>
                    <select
                      value={formData.iphoneModel}
                      onChange={(e) => setFormData({ ...formData, iphoneModel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
                    >
                      {IPHONE_MODELS_BY_SERIES.map((group) => (
                        <optgroup key={group.series} label={group.series} className="font-bold text-slate-900 bg-slate-100">
                          {group.models.map((model) => (
                            <option key={model} value={model} className="font-medium text-slate-800 bg-white">
                              {model}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Product Sizing & Compatibility">Product Sizing & Compatibility</option>
                      <option value="Custom Laser Name Engraving">Custom Laser Name Engraving</option>
                      <option value="Order & Tracking Status">Order & Tracking Status</option>
                      <option value="Warranty & Replacement Claim">Warranty & Replacement Claim</option>
                      <option value="Corporate / Bulk Quote">Corporate / Bulk Quote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Message / Inquiry *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist with your iPhone case setup?"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" /> Send Message
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppChat}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Instead
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 w-full">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" /> Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900"
              >
                <span>{faq.q}</span>
                {faqOpen === index ? (
                  <ChevronUp className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                )}
              </button>
              {faqOpen === index && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
