'use client';
import { NavBar } from '@/components/NavBar';
import { JapaneseRail } from '@/components/ui/JapaneseRail';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function SakuraPage() {
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const spans = legendRef.current?.querySelectorAll('.clip-text-reveal');
    if (spans) {
      spans.forEach((span) => {
        gsap.fromTo(span,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: span,
              start: 'top 85%',
            }
          }
        );
      });
    }

    // Kanji stroke
    const kanji = document.querySelector('.kanji-stroke');
    if (kanji) {
      const len = (kanji as SVGPathElement).getTotalLength();
      gsap.set(kanji, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(kanji, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: kanji,
          start: 'top 80%',
        }
      });
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <main className="relative w-full overflow-hidden">
      <NavBar />
      
      {/* SAKURA HERO */}
      <section className="relative w-full h-screen">
        <JapaneseRail position="left" text="桜の季節" className="text-saffron top-auto bottom-12 right-auto left-12 hidden md:block" />
        <JapaneseRail position="right" text="一期一会" className="text-washi/50 top-auto bottom-12 left-auto right-12 hidden md:block" />
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 mix-blend-screen pointer-events-none">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-sakura">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-sakura to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* SAKURA LEGEND */}
      <section className="relative w-full min-h-screen bg-atlas/40 backdrop-blur-[2px] z-10 py-32 px-6 lg:px-16 border-t border-sakura/10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0814]/80 -z-10 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          
          <div className="col-span-5 flex flex-col items-start lg:items-center">
            <svg viewBox="0 0 100 100" className="w-[80vw] md:w-64 md:h-64 opacity-80 mb-6 drop-shadow-[0_0_15px_rgba(255,183,197,0.3)]">
              {/* Simplified Kanji for Sakura 桜 */}
              <path className="kanji-stroke" d="M20,40 h30 M35,20 v50 M25,60 l-10,20 M45,60 l10,20 M60,30 h30 M70,20 l-10,20 M85,25 l5,10 M65,55 h25 M70,55 s5,20 -10,35 M75,55 s15,20 20,30" 
                    fill="none" stroke="url(#sakuraGrad)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="sakuraGrad" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#C1272D" />
                  <stop offset="100%" stopColor="#FFB7C5" />
                </linearGradient>
              </defs>
            </svg>
            <div className="font-mono text-xs tracking-[0.6em] text-saffron uppercase">Sakura</div>
          </div>

          <div ref={legendRef} className="col-span-7 flex flex-col">
            <span className="font-mono text-xs text-marrakech mb-8">伝説 / LA LÉGENDE</span>
            
            <div className="space-y-4 font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-snug text-washi/90 mb-16">
              <div><span className="clip-text-reveal block">In Japan, the sakura does not last.</span></div>
              <div><span className="clip-text-reveal block">That is exactly why it is beautiful.</span></div>
              <br/>
              <div><span className="clip-text-reveal block">Seven days of bloom.</span></div>
              <div><span className="clip-text-reveal block">A lifetime of memory.</span></div>
              <br/>
              <div><span className="clip-text-reveal block">We named our blend after this truth —</span></div>
              <div><span className="clip-text-reveal block">because great coffee, like great moments,</span></div>
              <div><span className="clip-text-reveal block italic text-sakura">cannot be held. Only honored.</span></div>
            </div>

            <div className="flex gap-12 border-l border-sakura/20 pl-8 opacity-80 font-light">
              <div className="flex flex-col gap-3 font-jp text-sakura text-sm">
                <span>花びら落ちる</span>
                <span>マラケシュの風に</span>
                <span>時は止まる</span>
              </div>
              <div className="flex flex-col gap-3 font-sans text-washi text-lg">
                <span>Petals fall</span>
                <span>In the wind of Marrakech</span>
                <span>Time stands still</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAKURA BLEND */}
      <section className="relative w-full py-40 flex items-center justify-center bg-transparent z-10 text-center px-6">
        <div className="absolute inset-0 bg-atlas/60 backdrop-blur-sm -z-10"></div>
        
        <div className="flex flex-col items-center max-w-2xl">
          <div className="font-mono text-[10px] text-saffron tracking-widest mb-6 uppercase">Édition Limitée · 限定版 · إصدار محدود</div>
          <div className="font-mono text-xs text-torii bg-torii/10 px-4 py-1 rounded-sm mb-12 border border-torii/20 animate-pulse">DISPONIBLE FÉV–AVR UNIQUEMENT</div>
          
          <h2 className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.8] mb-4">
            <span className="block bg-gradient-to-r from-sakura to-torii bg-clip-text text-transparent skew-display">SAKURA</span>
            <span className="block text-washi shadow-marrakech drop-shadow-md skew-display">NOIR</span>
          </h2>
          <div className="font-jp text-xl text-washi/60 tracking-widest mb-12">桜と珈琲の物語</div>

          <p className="font-sans text-lg text-washi/75 mb-12 leading-relaxed">
            Our rarest seasonal blend. Single-origin Ethiopian beans, cold-washed with cherry blossom water from the Yoshino mountains. Finished with a whisper of rose and cardamom sourced from the Marrakech souks. Available only during bloom season.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {['Cherry Blossom', 'Rose Water', 'Dark Honey'].map(tag => (
              <span key={tag} className="border border-sakura/30 rounded-full px-4 py-1.5 font-mono text-[10px] text-sakura uppercase tracking-widest bg-atlas/50">{tag}</span>
            ))}
          </div>

          <div className="mb-12">
            <div className="font-display text-5xl text-saffron mb-2">120 MAD</div>
            <div className="font-mono text-[9px] text-washi/40 uppercase tracking-widest">par tasse · per cup · للكوب</div>
          </div>

          <div className="w-full max-w-sm mb-16">
            <div className="flex justify-between font-mono text-[10px] text-marrakech uppercase tracking-widest mb-2">
              <span>0</span>
              <span>Seulement 47 portions restantes</span>
              <span>120</span>
            </div>
            <div className="h-1 w-full bg-washi/10">
              <div className="h-full bg-marrakech w-[39%]"></div>
            </div>
          </div>

          <MagneticButton variant="filled" className="bg-gradient-to-r from-torii to-marrakech border-transparent">
            PRÉ-COMMANDER LA SAKURA NOIR →
          </MagneticButton>
        </div>
      </section>

      {/* SAKURA GALLERY */}
      <section className="relative w-full py-24 mb-12 z-10 bg-atlas/90 overflow-hidden">
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[70vh] px-4 opacity-50 pointer-events-none">
            {/* Visual placeholders for horizontal scroll gallery in MVP */}
            <div className="bg-sakura/5 rounded border border-sakura/10 flex items-center justify-center font-display text-2xl text-washi/20">STILLNESS</div>
            <div className="bg-sakura/5 rounded border border-sakura/10 flex items-center justify-center font-display text-2xl text-washi/20">DUALITY</div>
            <div className="bg-sakura/5 rounded border border-sakura/10 flex items-center justify-center font-display text-2xl text-washi/20">TOUCH</div>
            <div className="bg-sakura/5 rounded border border-sakura/10 flex items-center justify-center font-display text-2xl text-washi/20">WARMTH</div>
            <div className="bg-sakura/5 rounded border border-sakura/10 flex items-center justify-center font-display text-2xl text-washi/20">HERITAGE</div>
         </div>
         <div className="absolute inset-0 flex items-center justify-center z-10">
             <div className="p-8 bg-atlas border border-sakura/30 text-center backdrop-blur-lg">
                <div className="font-display text-3xl mb-2 text-sakura relative">SAKURA GALLERY</div>
                <div className="font-mono text-xs text-washi/50 tracking-widest relative">VISUAL EXPERIENCE</div>
             </div>
         </div>
         <div className="absolute inset-0 flex flex-row overflow-hidden pointer-events-none opacity-20 filter grayscale z-0">
            <div className="flex-1 border border-sakura/10 h-full relative">
              <Image src="https://picsum.photos/seed/sakuragallery1/400/800" alt="Sakura 1" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 border border-sakura/10 h-full relative">
              <Image src="https://picsum.photos/seed/sakuragallery2/400/800" alt="Sakura 2" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 border border-sakura/10 h-full relative">
              <Image src="https://picsum.photos/seed/sakuragallery3/400/800" alt="Sakura 3" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 border border-sakura/10 h-full relative hidden md:block">
              <Image src="https://picsum.photos/seed/sakuragallery4/400/800" alt="Sakura 4" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 border border-sakura/10 h-full relative hidden lg:block">
              <Image src="https://picsum.photos/seed/sakuragallery5/400/800" alt="Sakura 5" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
         </div>
      </section>

      {/* SAKURA CTA */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent z-10 text-center">
         <div className="absolute inset-0 bg-gradient-to-t from-atlas via-atlas/50 to-transparent -z-10 mix-blend-multiply pointer-events-none"></div>
         <div className="font-jp text-lg text-washi/60 mb-8 tracking-widest">花の季節をともに</div>
         <h2 className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.9] mb-16 flex flex-col items-center">
           <span className="skew-display">VENEZ VIVRE</span>
           <span className="skew-display bg-gradient-to-r from-sakura to-torii bg-clip-text text-transparent">LA SAISON.</span>
         </h2>
         <div className="flex items-center gap-2 font-mono text-[10px] text-washi/45 tracking-widest mb-16 uppercase">
            <span>📍</span> 12 Derb Sidi Ahmed Tijaniyy · Médina · Marrakech
         </div>
         <div className="flex flex-col sm:flex-row gap-6">
            <MagneticButton variant="filled" className="px-12 py-5 scale-110 shadow-[0_0_20px_rgba(255,183,197,0.3)] bg-marrakech hover:bg-torii">
               RÉSERVER UNE TABLE →
            </MagneticButton>
            <MagneticButton variant="outline" className="px-12 py-5 border-sakura text-sakura hover:bg-sakura/10 scale-110" onClick={() => window.location.href='/menu'}>
               VOIR LE MENU →
            </MagneticButton>
         </div>
      </section>

      <Footer />
    </main>
  );
}
