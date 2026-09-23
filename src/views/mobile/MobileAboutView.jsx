import React from 'react';
import { ShieldCheck, Award, Zap } from 'lucide-react';
import { BRAND_STATS } from '../../data/reviews';

export default function MobileAboutView() {
  return (
    <div className="space-y-6 px-4 py-4 pb-28">
      {/* Header Banner */}
      <div
        className="rounded-2xl p-5 text-white text-center border border-amber-500/30 shadow-md space-y-2"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 12, 8, 0.88), rgba(15, 12, 8, 0.95)), url('/images/desert-gold-bg.png')`,
          backgroundSize: 'cover'
        }}
      >
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
          <Award className="w-3 h-3 text-amber-400" /> Engineering & Craft
        </span>
        <h2 className="text-2xl font-black text-white">Built for iPhone</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Crafting titanium cases, 15W Qi2 MagSafe accessories, and 9H sapphire camera armor across India.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5">
        {BRAND_STATS.map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <p className="text-xl font-black text-slate-900">{stat.value}</p>
            <p className="text-[11px] text-slate-600 font-bold mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pillars */}
      <div className="space-y-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h4 className="text-xs font-bold text-slate-900">16FT Military Drop Test</h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">MIL-STD-810H reinforced corner bumpers protect fragile iPhone rear glass.</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700">
            <Zap className="w-5 h-5 text-amber-600" />
            <h4 className="text-xs font-bold text-slate-900">38 N52 MagSafe Array</h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">Twice the magnetic strength of ordinary cases for secure car mounts & 15W charging.</p>
        </div>
      </div>
    </div>
  );
}
