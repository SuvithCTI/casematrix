import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function QuickNotification() {
  const { notification, setNotification, setIsCartOpen } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-xl p-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-3">
        {notification.image ? (
          <img
            src={notification.image}
            alt="Item"
            className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-white truncate">{notification.title}</h5>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{notification.message}</p>

          <button
            type="button"
            onClick={() => {
              setNotification(null);
              setIsCartOpen(true);
            }}
            className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> View Bag & Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
