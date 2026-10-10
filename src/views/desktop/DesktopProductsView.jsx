import React from 'react';
import DesktopProductGrid from '../../components/desktop/DesktopProductGrid';
import { Sparkles } from 'lucide-react';

export default function DesktopProductsView() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Official Flagship Catalog & Accessories
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Mobile Phones, Cases, Chargers & Gear
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          Explore genuine 5G smartphones, precision MagSafe cases, ultra-fast GaN chargers, high-capacity power banks, and certified accessories. Prices in INR (₹).
        </p>
      </div>

      {/* Catalog Grid */}
      <DesktopProductGrid />
    </div>
  );
}
