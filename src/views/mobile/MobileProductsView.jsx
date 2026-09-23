import React from 'react';
import MobileProductCard from '../../components/mobile/MobileProductCard';
import { useProduct } from '../../context/ProductContext';
import { SlidersHorizontal, Smartphone } from 'lucide-react';
import { IPHONE_MODELS } from '../../data/categories';

export default function MobileProductsView() {
  const {
    filteredProducts,
    selectedModel,
    setSelectedModel,
    sortBy,
    setSortBy,
    setSearchQuery,
    setSelectedCategory,
  } = useProduct();

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedModel('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="space-y-4 px-4 py-3 pb-28">
      {/* iPhone Cover Model Selector Strip */}
      <div className="space-y-2 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-amber-600" /> Filter by iPhone Model:
          </span>
          {selectedModel !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedModel('all')}
              className="text-amber-700 text-[11px] underline font-bold active:scale-95"
            >
              Show All Models
            </button>
          )}
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2">
          <button
            type="button"
            onClick={() => setSelectedModel('all')}
            className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition flex items-center gap-1 active:scale-95 ${
              selectedModel === 'all'
                ? 'bg-slate-900 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Models
          </button>
          {IPHONE_MODELS.filter(m => m.id !== 'all').map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedModel(m.id)}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition flex items-center gap-1 active:scale-95 ${
                selectedModel === m.id
                  ? 'bg-amber-600 text-white font-black shadow-md shadow-amber-600/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Header Bar with Sort & Results in INR */}
      <div className="flex items-center justify-between text-xs text-slate-700 pt-0.5 px-0.5">
        <span className="font-semibold">Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items (INR ₹)</span>
        <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs shadow-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low-High (₹)</option>
            <option value="price-high">Price: High-Low (₹)</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center space-y-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <p className="text-sm font-bold text-slate-900">No iPhone covers found</p>
          <p className="text-xs text-slate-500">Try changing your model selection</p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((p) => (
            <MobileProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
