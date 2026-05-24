export function Hero() {
  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-20 filter grayscale mix-blend-screen scale-110 motion-safe:animate-[float_20s_ease-in-out_infinite]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/falling-cherry-blossom-petals-2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Typography Layers */}
      <div className="relative z-20 text-center flex flex-col items-center translate-y-[-20px] pointer-events-none w-full px-4">
        <span className="font-mono text-[5px] xs:text-[6px] md:text-[10px] tracking-[0.16em] xs:tracking-[0.22em] md:tracking-[0.5em] text-saffron mb-2">EST. 2024 • MARRAKECH • مقهى مراكش</span>
        <h1 className="font-display text-[clamp(40px,13.5vw,140px)] leading-[1.0] xs:leading-[0.94] md:leading-[0.8] tracking-[-0.01em] xs:tracking-[-0.02em] md:tracking-[-0.04em] flex flex-col w-full items-center justify-center">
          <span className="skew-display">CAFÉ</span>
          <span className="bg-gradient-to-r from-saffron to-marrakech bg-clip-text text-transparent skew-display pr-1 md:pr-4">
            MARRAKECH
          </span>
        </h1>
        <div className="w-48 md:w-64 h-[1px] bg-gradient-to-r from-transparent via-saffron to-transparent my-6 md:my-8 scale-x-0 animate-[scaleIn_1s_ease-out_forwards] origin-center"></div>
        <p className="font-sans text-[clamp(10px,3.1vw,20px)] font-light italic opacity-80 tracking-wide leading-relaxed max-w-[320px]">
          Where Atlas Mountains meet Kyoto dawn
        </p>
      </div>

      {/* Bottom CTA Row */}
      <div className="absolute bottom-24 flex flex-col sm:flex-row gap-6 sm:gap-8 z-30 pointer-events-auto">
        <a href="/menu" className="px-7 py-2.5 bg-marrakech text-white text-[8px] sm:text-[11px] font-mono tracking-[0.26em] uppercase transition-all shadow-[0_0_20px_rgba(193,39,45,0.3)] hover:scale-105">
          Explorer le Menu →
        </a>
        <a href="#about" className="px-7 py-2.5 border border-saffron/50 text-saffron text-[8px] sm:text-[11px] font-mono tracking-[0.26em] uppercase hover:bg-saffron/10 transition-colors">
          Notre Histoire
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 mix-blend-screen pointer-events-none">
        <span className="font-mono text-[6px] sm:text-[9px] tracking-[0.32em] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-saffron to-transparent"></div>
      </div>

    </section>
  );
}
