'use client';
import { useCountUp } from '@/lib/useCountUp';
import { SplitReveal } from './ui/SplitReveal';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function About() {
  const { count: countBlends, ref: refBlends } = useCountUp(12, 2000, "");
  const { count: countOrigins, ref: refOrigins } = useCountUp(3, 2000, "");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const reveals = sectionRef.current.querySelectorAll('.clip-reveal');
      reveals.forEach((el) => {
        gsap.fromTo(el, 
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0, y: 20 },
          { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
            opacity: 1, 
            y: 0,
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full min-h-screen bg-atlas z-20 py-32 px-6 md:px-16 overflow-hidden diagonal-top">
      <div className="absolute inset-0 zellige opacity-[0.04]"></div>
      
      <div className="absolute top-24 left-8 hidden xl:block z-10">
        <span className="vertical-rail font-jp text-saffron text-sm tracking-[0.4em] opacity-60">珈琲の道</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Column - Stats */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-16">
          <div className="relative">
            <div ref={refBlends} className="font-display text-[clamp(5rem,10vw,9rem)] leading-none text-washi">{countBlends}</div>
            <div className="font-mono text-xs text-saffron tracking-[0.3em] uppercase mt-2">Signature Blends</div>
          </div>
          
          <div className="relative">
            <div ref={refOrigins} className="font-display text-[clamp(5rem,10vw,9rem)] leading-none text-washi">{countOrigins}</div>
            <div className="font-mono text-xs text-saffron tracking-[0.3em] uppercase mt-2">Origins (Morocco · Japan · Ethiopia)</div>
          </div>

          <div className="relative">
            <div className="font-display text-[clamp(5rem,10vw,9rem)] leading-none text-washi">∞</div>
            <div className="font-mono text-xs text-saffron tracking-[0.3em] uppercase mt-2">Moments of Peace</div>
          </div>
        </div>

        {/* Right Column - Story */}
        <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-center relative">
          <div className="text-marrakech font-mono text-xs tracking-widest mb-12">01 / NOTRE HISTOIRE</div>
          
          <div className="space-y-8 font-sans text-xl md:text-2xl font-light leading-relaxed text-washi/90">
            <p className="text-saffron italic tracking-wide clip-reveal">
              <SplitReveal text="Born from the convergence of two ancient hospitality cultures." splitBy="word" elementType="span" />
            </p>
            <div className="clip-reveal">
              <SplitReveal text="Every cup carries the warmth of a Marrakech medina and the precision of a Kyoto tea ceremony." splitBy="word" delay={0.2} elementType="p" />
            </div>
            
            <div className="clip-reveal w-full h-[300px] sm:h-[400px] relative overflow-hidden glass rounded-xl my-8">
              <img src="https://picsum.photos/seed/marrakech_cafe/800/600" alt="Cafe Marrakech Interior" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-marrakech/10 mix-blend-color"></div>
            </div>

            <div className="clip-reveal">
              <SplitReveal text="We source our beans directly — Ethiopian highlands, Yemeni terraces, Indonesian archipelago. Each origin chosen for what it whispers when brewed slowly." splitBy="word" delay={0.4} />
            </div>
            <div className="clip-reveal">
              <SplitReveal text="Come as a stranger. Leave as family." splitBy="word" delay={0.6} className="text-saffron italic" />
            </div>
          </div>

          <div className="absolute -top-12 -right-8 md:-right-16 rotate-[-3deg] border border-saffron/30 p-4 bg-atlas/80 backdrop-blur-sm shadow-xl hidden md:block">
            <span className="font-jp text-saffron text-sm opacity-80 block">赤い珈琲 —</span>
            <span className="font-mono text-washi/70 text-xs">Red Coffee Philosophy</span>
          </div>
        </div>

      </div>
    </section>
  );
}
