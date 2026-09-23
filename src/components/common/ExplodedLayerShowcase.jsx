import React, { useState } from 'react';
import { ShieldCheck, Zap, Sparkles, Layers, CheckCircle2, Cpu, Compass } from 'lucide-react';

const LAYERS = [
  {
    id: 'titanium',
    layerNumber: '01',
    name: 'Aerospace-Grade Titanium Outer Bezel',
    material: 'Grade 5 CNC-Machined Titanium Alloy',
    thickness: '0.8 mm',
    protection: 'Deflects 94% direct corner shocks',
    color: 'from-amber-500 to-amber-600',
    dotTop: '18%',
    dotLeft: '78%',
    desc: 'Precision-milled from aerospace Grade 5 titanium. Provides rigid corner defense and elevated triple-lens sapphire protection with zero weight penalty.'
  },
  {
    id: 'polymer',
    layerNumber: '02',
    name: 'Impact-Absorbing Shock Polymer Core',
    material: 'Non-Newtonian D3O Thermoplastic Elastomer',
    thickness: '1.2 mm',
    protection: '16ft Military Drop Certified (MIL-STD-810H)',
    color: 'from-slate-600 to-slate-800',
    dotTop: '40%',
    dotLeft: '82%',
    desc: 'Dense shock-dispersal matrix with internal honeycomb air pockets that instantly locks on impact to absorb and redirect shock waves away from the glass.'
  },
  {
    id: 'magsafe',
    layerNumber: '03',
    name: 'MagSafe Copper Coil & 38 N52 Magnet Array',
    material: 'Pure Copper Inductive Coil + Neodymium Magnets',
    thickness: '0.4 mm',
    protection: '15W Qi2 Fast Wireless & 3,500g Snap Grip',
    color: 'from-orange-500 to-amber-600',
    dotTop: '62%',
    dotLeft: '75%',
    desc: '38 ultra-strong N52 neodymium rare-earth magnets deliver 2x stronger magnetic lock for rock-solid car mount stability and 15W full-speed wireless snap.'
  },
  {
    id: 'microfiber',
    layerNumber: '04',
    name: 'Japanese Suede Microfiber Anti-Scratch Bed',
    material: 'High-Density Ultrasonic-Welded Microfiber',
    thickness: '0.3 mm',
    protection: 'Zero Micro-Abrasions / Heat Dispersal',
    color: 'from-neutral-500 to-neutral-700',
    dotTop: '82%',
    dotLeft: '80%',
    desc: 'Silky smooth interior lining cushions the iPhone rear glass and polished frame, preventing micro-scratches from trapped dust while aiding thermal dissipation.'
  }
];

export default function ExplodedLayerShowcase() {
  const [selectedLayer, setSelectedLayer] = useState(LAYERS[0]);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-[#0e0c0a] via-[#120f0c] to-[#0a0806] p-6 sm:p-10 text-white shadow-2xl space-y-8"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" /> Multi-Layer Anatomy
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight">
            Titan-Max™ 4-Layer Drop Shield
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Engineered layer by layer for unmatched impact dispersion & MagSafe integration
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono tracking-wide">
            16 FT Drop Tested (MIL-STD-810H)
          </span>
        </div>
      </div>

      {/* Main 3D Exploded Diagram Visual Container */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-tr from-black/80 via-black/40 to-slate-900/60 shadow-2xl group">
        <img
          src="/images/case-exploded-layers.jpg"
          alt="Titan-Max 4-Layer Exploded Structural Architecture"
          className="block w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.015]"
        />

        {/* Selected Layer Info Overlay Ribbon on bottom */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-xl backdrop-blur-md bg-black/75 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
              {selectedLayer.layerNumber}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white">{selectedLayer.name}</h4>
              <p className="text-[11px] text-amber-300/90 font-medium">{selectedLayer.material} • {selectedLayer.thickness}</p>
            </div>
          </div>
          <div className="text-[11px] font-semibold text-slate-300 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
            {selectedLayer.protection}
          </div>
        </div>
      </div>

      {/* Interactive Layer Breakdown Selector Cards (2 Columns on Mobile, 4 on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {LAYERS.map((layer) => {
          const isActive = selectedLayer.id === layer.id;
          return (
            <div
              key={layer.id}
              onClick={() => setSelectedLayer(layer)}
              className={`p-3 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-500/15 border-amber-400 shadow-lg ring-1 ring-amber-400/40 translate-y-[-2px]'
                  : 'bg-white/5 border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-md bg-amber-500/20 flex items-center justify-center text-[9px] sm:text-[10px]">
                      {layer.layerNumber}
                    </span>
                    {layer.thickness}
                  </span>
                  {isActive ? (
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                  ) : (
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-bold">Layer</span>
                  )}
                </div>
                <h4 className="text-[11px] sm:text-sm font-bold text-white leading-snug line-clamp-2 sm:line-clamp-none">
                  {layer.name}
                </h4>
                <p className="hidden sm:block text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                  {layer.desc}
                </p>
              </div>

              <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/10 text-[9px] sm:text-[10px] text-amber-400 font-semibold line-clamp-1 sm:line-clamp-none">
                <span>{layer.protection}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
