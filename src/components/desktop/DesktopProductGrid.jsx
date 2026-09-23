import React from 'react';
import { SlidersHorizontal, X, Smartphone, Search } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { IPHONE_MODELS } from '../../data/categories';
import DesktopProductCard from './DesktopProductCard';

export default function DesktopProductGrid() {
  const {
    filteredProducts,
    selectedSeries,
    setSelectedSeries,
    selectedModel,
    setSelectedModel,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useProduct();

  const SERIES_LIST = [
    { id: 'all', label: 'All Series' },
    { id: 'iPhone 16 Series', label: 'iPhone 16' },
    { id: 'iPhone 15 Series', label: 'iPhone 15' },
    { id: 'iPhone 14 Series', label: 'iPhone 14' },
    { id: 'iPhone 13 Series', label: 'iPhone 13' },
  ];

  // Dynamic models for current active series
  const currentSeriesModels = selectedSeries === 'all'
    ? IPHONE_MODELS.filter(m => m.id !== 'all')
    : IPHONE_MODELS.filter(m => m.series === selectedSeries);

  const handleSeriesChange = (seriesId) => {
    setSelectedSeries(seriesId);
    setSelectedModel('all'); // reset to all within that series
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSeries('all');
    setSelectedModel('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedSeries !== 'all' ||
    selectedModel !== 'all' ||
    searchQuery !== '';

  return (
    <section className="w-full space-y-6">
      {/* ========================================================
          CLEAN & MINIMAL TOP IPHONE FILTER BAR
         ======================================================== */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200/90 shadow-xs space-y-2.5 sm:space-y-3">
        {/* Row 1: Series Selector + Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
          {/* iPhone Series Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl sm:rounded-2xl overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full">
            <span className="text-[11px] sm:text-xs font-bold text-slate-600 px-2 sm:px-2.5 flex items-center gap-1 shrink-0">
              <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" /> Series:
            </span>
            {SERIES_LIST.map((s) => {
              const isActive = selectedSeries === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSeriesChange(s.id)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Search Input */}
            <div className="relative flex-1 md:w-44">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs text-slate-700 shrink-0">
              <SlidersHorizontal className="w-3 h-3 text-amber-600 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low-High</option>
                <option value="price-high">Price: High-Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center justify-center transition shrink-0"
                title="Reset Filters"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Specific Model Selection for the Chosen Series */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-0.5">
          <button
            type="button"
            onClick={() => handleModelChange('all')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition whitespace-nowrap shrink-0 active:scale-95 ${
              selectedModel === 'all'
                ? 'bg-amber-600 text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Models
          </button>

          {currentSeriesModels.map((m) => {
            const isSelected = selectedModel === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleModelChange(m.id)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition whitespace-nowrap shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          FULL-WIDTH PRODUCT GRID (2 Columns on Mobile, 4 on Desktop)
         ======================================================== */}
      {filteredProducts.length === 0 ? (
        <div className="p-10 sm:p-16 text-center rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs w-full">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <Smartphone className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900">No iPhone covers found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your filters or selecting "All Models" to see the full lineup.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold transition shadow-xs hover:bg-slate-800"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 w-full">
          {filteredProducts.map((product) => (
            <DesktopProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
