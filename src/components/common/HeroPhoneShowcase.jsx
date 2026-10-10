import React, { useRef, useEffect } from 'react';

export default function HeroPhoneShowcase() {
  const showcaseVideo = '/videos/hero-showcase.mp4';
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="relative w-full h-full min-h-[220px] sm:min-h-[360px] lg:min-h-[520px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-2xl sm:rounded-[30px] overflow-hidden bg-[#1a1f29] text-white shadow-[0_0_0_1px_rgba(217,119,6,0.35),0_12px_28px_rgba(0,0,0,0.25)] transition-all duration-700 select-none group/showcase"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(12, 10, 7, 0.2), rgba(12, 10, 7, 0.65)), url('/images/desert-gold-bg.png')`
      }}
    >
      <video
        ref={videoRef}
        src={showcaseVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
