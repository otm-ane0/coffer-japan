'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/MagneticButton';
import { BrandStamp } from './ui/BrandStamp';

export function HomeCTA() {
  const archRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!archRef.current) return;
    
    const length = archRef.current.getTotalLength();
    gsap.set(archRef.current, { strokeDasharray: length, strokeDashoffset: length });
    
    gsap.to(archRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: archRef.current,
        start: 'top 70%',
      }
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-atlas flex items-center justify-center overflow-hidden diagonal-top py-32 px-6">
      {/* Background Arch SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
        <svg viewBox="0 0 400 600" className="w-[90vw] max-w-[600px] h-full h-[90vh] fill-none">
          <path 
            ref={archRef}
            d="M 50,600 L 50,200 C 50,80 150,50 200,50 C 250,50 350,80 350,200 L 350,600" 
            stroke="var(--color-saffron)" 
            strokeWidth="2" 
            className="opacity-50"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <span className="font-mono text-xs tracking-[0.4em] text-saffron mb-8 uppercase">مقهى مراكش · 珈琲マラケシュ</span>
        
        <h2 className="font-display text-[clamp(4rem,9vw,8rem)] leading-[0.9] text-washi mb-16 flex flex-col items-center">
          <span className="overflow-hidden inline-block"><span className="inline-block transform skew-display">COME FOR THE COFFEE.</span></span>
          <span className="overflow-hidden inline-block"><span className="inline-block transform skew-display bg-gradient-to-r from-marrakech to-saffron bg-clip-text text-transparent">STAY FOR THE FEELING.</span></span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <MagneticButton variant="filled" className="px-12 py-5 scale-110">
            VOIR LE MENU →
          </MagneticButton>
          <MagneticButton variant="outline" className="px-12 py-5 border-sakura text-sakura hover:bg-sakura/10 scale-110" onClick={() => window.location.href='/sakura'}>
            LA PAGE SAKURA 🌸
          </MagneticButton>
        </div>
        
        <p className="font-mono text-[10px] text-washi/40 tracking-[0.2em] uppercase max-w-sm">
          12 Derb Sidi Ahmed Tijaniyy · Médina · Marrakech
        </p>
      </div>

      <div className="absolute top-16 right-16 hidden md:block">
        <BrandStamp />
      </div>
    </section>
  );
}
