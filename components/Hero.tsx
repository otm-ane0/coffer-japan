import { BrandStamp } from './ui/BrandStamp';
import { ArabesqueCorner } from './ui/ArabesqueCorner';
import { JapaneseRail } from './ui/JapaneseRail';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/marrakech_hero/1920/1080"
          alt="Cafe Marrakech Background"
          fill
          className="object-cover opacity-20 filter grayscale mix-blend-screen scale-110 motion-safe:animate-[float_20s_ease-in-out_infinite]"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-atlas via-atlas/80 to-atlas"></div>
      </div>

      {/* Bloom/Glow Effect for 3D integration point */}
      <div className="absolute w-[500px] h-[500px] flex items-center justify-center pointer-events-none z-0">
        <div className="absolute w-64 h-64 bg-marrakech/10 blur-[100px] rounded-full"></div>
        <div className="absolute w-96 h-96 bg-sakura/5 blur-[80px] rounded-full translate-x-20 -translate-y-20"></div>
      </div>

      <ArabesqueCorner position="top-left" />
      <ArabesqueCorner position="bottom-right" />
      
      <JapaneseRail position="left" text="珈琲マラケシュ" />
      <JapaneseRail position="right" text="アトラス × 京都" className="text-marrakech" />

      {/* Typography Layers */}
      <div className="relative z-20 text-center flex flex-col items-center translate-y-[-20px] pointer-events-none w-full px-4">
        <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] text-saffron mb-2">EST. 2024 • MARRAKECH • مقهى مراكش</span>
        <h1 className="font-display text-[15vw] xs:text-[13vw] sm:text-[80px] md:text-[140px] leading-[0.85] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] flex flex-col w-full items-center justify-center">
          <span className="skew-display">CAFÉ</span>
          <span className="bg-gradient-to-r from-saffron to-marrakech bg-clip-text text-transparent skew-display pr-1 md:pr-4">
            MARRAKECH
          </span>
        </h1>
        <div className="w-48 md:w-64 h-[1px] bg-gradient-to-r from-transparent via-saffron to-transparent my-6 md:my-8 scale-x-0 animate-[scaleIn_1s_ease-out_forwards] origin-center"></div>
        <p className="font-sans text-sm xs:text-base md:text-xl font-light italic opacity-80 tracking-wide max-w-[400px]">
          Where Atlas Mountains meet Kyoto dawn
        </p>
      </div>

      {/* Bottom CTA Row */}
      <div className="absolute bottom-24 flex flex-col sm:flex-row gap-8 z-30 pointer-events-auto">
        <a href="/menu" className="px-10 py-4 bg-marrakech text-white text-[11px] font-mono tracking-[0.3em] uppercase transition-all shadow-[0_0_20px_rgba(193,39,45,0.3)] hover:scale-105">
          Explorer le Menu →
        </a>
        <a href="#about" className="px-10 py-4 border border-saffron/50 text-saffron text-[11px] font-mono tracking-[0.3em] uppercase hover:bg-saffron/10 transition-colors">
          Notre Histoire
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 mix-blend-screen pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-saffron to-transparent"></div>
      </div>

      {/* Circular Brand Stamp */}
      <BrandStamp className="absolute md:top-32 md:right-32 scale-75 md:scale-100 hidden md:flex" />
    </section>
  );
}
