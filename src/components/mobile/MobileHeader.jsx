import React, { useState } from 'react';
import { ShoppingBag, X, Smartphone, ChevronDown, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { IPHONE_MODELS } from '../../data/categories';

export default function MobileHeader({ setActiveTab }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { selectedModel, setSelectedModel, searchQuery, setSearchQuery } = useProduct();
  const [showModelModal, setShowModelModal] = useState(false);

  const currentModelName = IPHONE_MODELS.find(m => m.id === selectedModel)?.name || 'All iPhones';

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val && setActiveTab) {
      setActiveTab('products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0a09]/95 backdrop-blur-xl border-b border-amber-500/20 px-3.5 py-2.5 shadow-lg text-white space-y-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2">
        {/* Brand */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-left shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 flex items-center justify-center shadow-md shadow-amber-500/20">
            <span className="text-slate-950 font-black text-sm">A</span>
          </div>
          <div>
            <span className="text-sm font-black tracking-wider text-white block leading-tight">
              Case Matrix
            </span>
            <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block leading-none">
              iPhone Armor
            </span>
          </div>
        </button>

        {/* Model Filter Pill */}
        <button
          type="button"
          onClick={() => setShowModelModal(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-slate-100 max-w-[130px] truncate active:scale-95 transition"
        >
          <Smartphone className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate">{currentModelName}</span>
          <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
        </button>

        {/* Cart Icon */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 font-black active:scale-95 transition shrink-0"
          aria-label="View shopping bag"
        >
          <ShoppingBag className="w-4 h-4 text-slate-950" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black flex items-center justify-center border border-amber-500/40">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search iPhone models, titanium, MagSafe..."
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white/15 transition shadow-inner"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Mobile iPhone Model Picker Modal */}
      {showModelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0">
          <div className="w-full bg-[#14100b] border-t border-amber-500/30 rounded-t-3xl p-5 max-h-[80vh] flex flex-col shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" /> Select Your iPhone Model
              </h4>
              <button
                type="button"
                onClick={() => setShowModelModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-3 space-y-1.5">
              {IPHONE_MODELS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedModel(m.id);
                    setShowModelModal(false);
                    setActiveTab('products');
                  }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold transition flex items-center justify-between ${
                    selectedModel === m.id
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>{m.name}</span>
                  <span className={`text-[10px] ${selectedModel === m.id ? 'text-slate-800' : 'text-slate-500'}`}>{m.screenSize}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
