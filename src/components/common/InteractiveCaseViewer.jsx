import React, { useState } from 'react';
import { Sparkles, Shield, Zap, Eye, RotateCw, Check, Layers, Type } from 'lucide-react';

export default function InteractiveCaseViewer({
  product,
  activeColor = '#c5b49e',
  finish = 'matte',
  engravingText = '',
  model = 'iPhone 16 Pro Max'
}) {
  const [viewAngle, setViewAngle] = useState('back'); // 'back' | 'perspective' | 'front'

  const finishStyles = {
    matte: { name: 'Matte Titanium Ceramic', badge: 'Ultra-Fine Anti-Fingerprint', opacity: 'opacity-90' },
    gloss: { name: 'High-Gloss Titanium', badge: 'Mirror Sheen Reflective', opacity: 'opacity-100' },
    carbon: { name: 'Forged Carbon Fiber', badge: 'Aerospace Weave Pattern', opacity: 'opacity-95' },
    leather: { name: 'Full-Grain Italian Leather', badge: 'Supple Vegetable-Tanned', opacity: 'opacity-90' }
  };

  const currentFinish = finishStyles[finish] || finishStyles.matte;

  return (
    <div
      className="relative w-full aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/30 flex flex-col justify-between p-6 bg-cover bg-center shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(12, 10, 7, 0.45), rgba(12, 10, 7, 0.9)), url('/images/desert-gold-bg.png')`
      }}
    >
      {/* Top Bar Indicators */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Live Case Customizer
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-mono">
            {model}
          </span>
        </div>

        {/* Angle Toggles */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setViewAngle('back')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              viewAngle === 'back' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Back & MagSafe
          </button>
          <button
            type="button"
            onClick={() => setViewAngle('perspective')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              viewAngle === 'perspective' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            3/4 Angle
          </button>
        </div>
      </div>

      {/* Main Interactive Phone Case Centerpiece */}
      <div className="relative my-auto flex items-center justify-center py-4 z-10">
        <div className="relative max-w-[340px] sm:max-w-[400px] w-full transition-all duration-500 transform hover:scale-105">
          {/* Dynamic Color Glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl opacity-40 transition-colors duration-500 pointer-events-none"
            style={{ backgroundColor: activeColor }}
          />

          {/* Phone Case Base Image */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black/40">
            {viewAngle === 'perspective' ? (
              <img
                src="/images/hero-desert-gold.jpg"
                alt="iPhone Case Perspective"
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="relative aspect-[4/5] bg-gradient-to-b from-slate-900 via-stone-900 to-black p-6 flex flex-col items-center justify-between border border-amber-500/20 rounded-3xl overflow-hidden">
                {/* Simulated Camera Island */}
                <div className="w-28 h-28 rounded-2xl bg-stone-900/90 border-2 border-stone-700/80 shadow-2xl p-2 grid grid-cols-2 gap-1.5 self-start ml-2 mt-2">
                  <div className="w-9 h-9 rounded-full bg-black border-2 border-stone-600 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950/40 border border-amber-500/40" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-black border-2 border-stone-600 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950/40 border border-amber-500/40" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-black border-2 border-stone-600 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950/40 border border-amber-500/40" />
                  </div>
                  <div className="w-4 h-4 rounded-full bg-amber-100 self-center justify-self-center shadow-sm" />
                </div>

                {/* Simulated MagSafe Golden Ring with Active Color Tint */}
                <div
                  className="relative w-36 h-36 rounded-full border-[6px] flex items-center justify-center shadow-lg transition-colors duration-300"
                  style={{ borderColor: activeColor || '#c5b49e' }}
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm" />
                  <div
                    className="absolute -bottom-6 w-2.5 h-6 rounded-full"
                    style={{ backgroundColor: activeColor || '#c5b49e' }}
                  />
                </div>

                {/* Laser Engraving Preview on Bottom of Case */}
                <div className="w-full text-center pb-4 z-20">
                  {engravingText ? (
                    <div className="inline-block px-4 py-1.5 rounded-lg bg-black/60 border border-amber-400/40 shadow-inner">
                      <span className="font-mono text-xs tracking-widest uppercase font-bold text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {engravingText}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider">
                      — ADD CUSTOM LASER TEXT —
                    </span>
                  )}
                </div>

                {/* Material Texture Overlay */}
                {finish === 'carbon' && (
                  <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:8px_8px] opacity-25 pointer-events-none" />
                )}
                {finish === 'leather' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/60 via-amber-950/20 to-stone-900/60 opacity-50 pointer-events-none" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Floating Spec Summary */}
      <div className="z-10 bg-black/75 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full border border-amber-400" style={{ backgroundColor: activeColor }} />
          <span>Finish: <strong className="text-amber-300">{currentFinish.name}</strong></span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400 font-bold">
          <Zap className="w-3.5 h-3.5" /> MagSafe Qi2 Compatible
        </div>
      </div>
    </div>
  );
}
