import React from 'react';

export default function BrandLogo({ size = 'md', showSubtitle = true, className = '', variant = 'dark' }) {
  // Size variants
  const badgeSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl',
    md: 'w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl',
    lg: 'w-11 h-11 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base font-black tracking-wider',
    md: 'text-base sm:text-xl font-black tracking-wider',
    lg: 'text-xl sm:text-2xl font-black tracking-wider',
  };

  const subtitleSizes = {
    sm: 'text-[7px] sm:text-[8px] font-extrabold tracking-widest uppercase',
    md: 'text-[8px] sm:text-[10px] font-extrabold tracking-widest uppercase',
    lg: 'text-[10px] sm:text-xs font-extrabold tracking-widest uppercase',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Dynamic Geometric Matrix Armor Emblem */}
      <div
        className={`${badgeSizes[size] || badgeSizes.md} relative bg-gradient-to-tr from-[#b45309] via-[#f59e0b] to-[#fbbf24] p-[1.5px] shadow-lg shadow-amber-500/25 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
      >
        <div className="w-full h-full bg-[#0d0a07] rounded-[inherit] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/30 to-transparent opacity-60" />
          
          {/* Matrix Shield Vector Monogram */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[70%] h-[70%] relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <linearGradient id="cmGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="cmInner" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>

            {/* Outer Armor Hexagon Shield / Matrix Facet */}
            <path
              d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z"
              stroke="url(#cmGold)"
              strokeWidth="2"
              strokeLinejoin="round"
              className="opacity-90"
            />

            {/* Matrix Geometric Grid Lines */}
            <path
              d="M16 3V16M16 29V16M27 9.5L16 16M5 22.5L16 16M5 9.5L16 16M27 22.5L16 16"
              stroke="url(#cmGold)"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />

            {/* Central MagSafe Titanium Core Ring */}
            <circle
              cx="16"
              cy="16"
              r="5"
              fill="#0d0a07"
              stroke="url(#cmInner)"
              strokeWidth="2"
            />

            {/* Matrix Micro Node */}
            <circle
              cx="16"
              cy="16"
              r="2"
              fill="url(#cmGold)"
            />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div>
        <span className={`${titleSizes[size] || titleSizes.md} ${isLight ? 'text-slate-900' : 'text-white'} flex items-center gap-1 leading-none font-black`}>
          Case Matrix
        </span>
        {showSubtitle && (
          <p className={`${subtitleSizes[size] || subtitleSizes.md} ${isLight ? 'text-amber-600' : 'text-amber-400'} mt-1 leading-none font-bold`}>
            iPhone Studio India
          </p>
        )}
      </div>
    </div>
  );
}
