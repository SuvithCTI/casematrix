import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, PhoneCall, HelpCircle, Package } from 'lucide-react';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const supportNumber = '919384694189';

  const quickPrompts = [
    { title: 'Check iPhone 16 Pro Max Stock', text: 'Hi! Is the Apex Titanium Armor case in stock for iPhone 16 Pro Max in Desert Gold?' },
    { title: 'Free Laser Engraving Query', text: 'Hi! Can you engrave my name on the vegan leather iPhone case?' },
    { title: 'Track My Active Order', text: 'Hello! I would like to check the tracking status of my recent iPhone accessory order.' },
    { title: 'Bulk & Corporate Indian Orders', text: 'Hello, we are looking for 25+ MagSafe cases with custom company logo for our team in India.' },
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || message;
    if (!text.trim()) return;
    const url = `https://wa.me/${supportNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-md">
                📱
              </div>
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  Case Matrix Concierge
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-xs text-emerald-200">24/7 Specialist Support in India</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            <p className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-2xl border border-white/5 leading-relaxed">
              👋 Namaste! Need help selecting the right iPhone model case or want to order directly via UPI on WhatsApp?
            </p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Inquiries:</span>
              {quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-emerald-950/40 hover:border-emerald-500/40 border border-slate-800 text-xs text-slate-200 transition flex items-center justify-between group"
                >
                  <span className="truncate">{item.title}</span>
                  <Send className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about iPhone accessories..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group relative"
        aria-label="Open WhatsApp Chat"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 border-2 border-slate-900 flex items-center justify-center text-[9px] font-black">
          1
        </span>
      </button>
    </div>
  );
}
