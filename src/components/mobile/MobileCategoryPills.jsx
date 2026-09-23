import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useProduct } from '../../context/ProductContext';

export default function MobileCategoryPills() {
  const { selectedCategory, setSelectedCategory } = useProduct();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none px-4 -mx-4">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition flex items-center gap-1.5 ${
              isSelected
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 font-black'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{cat.name}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              isSelected ? 'bg-amber-900 text-amber-100' : 'bg-slate-100 text-slate-500'
            }`}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
