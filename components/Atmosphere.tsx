'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitReveal } from './ui/SplitReveal';
import Image from 'next/image';

export function Atmosphere() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    sectionRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector('.img-scale');
      
      if (img) {
        gsap.fromTo(img, 
          { scale: 1.15, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%', scrub: 0.5 } }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => sectionRefs.current.includes(st.trigger as HTMLDivElement) && st.kill());
    };
  }, []);

  const data = [
    {
      label: "01 / L'ESPACE", title: "Where Zellige Meets Tatami", body: "Our space is a meditation. Handmade zellige tiles imported from Fez line the floor. Above them, Japanese paper lanterns cast a light that has no name in either language — only feeling.", extra: "Marrakech, Médina · 40000", layout: "left", img: "https://picsum.photos/seed/riad_marrakech_7/1200/1600"
    },
    {
      label: "02 / LE RITUEL", title: "The Art of the First Sip", body: "We follow the Japanese concept of Ichigo Ichie — one time, one meeting. Every cup prepared as though it will never be made again. Every customer received as an unrepeatable guest.", extraJP: "一期一会", layout: "right", img: "https://picsum.photos/seed/coffee_pouring/1200/1600"
    },
    {
      label: "03 / LES GENS", title: "Every Face Tells Two Stories", body: "We are Moroccans who fell in love with Japanese precision. Japanese who found themselves in Moroccan warmth. And everyone in between who simply wanted a cup that felt like belonging.", layout: "left", img: "https://picsum.photos/seed/portrait_grandma_4/1200/1600"
    }
  ];

  return (
    <section className="bg-washi w-full text-atlas pb-32">
      {data.map((row, i) => (
        <div key={i} ref={el => { sectionRefs.current[i] = el; }} className="w-full flex flex-col md:flex-row items-center border-b border-atlas/10 overflow-hidden relative">
          
          <div className={`w-full md:w-1/2 h-[60vh] md:h-[80vh] relative overflow-hidden ${row.layout === 'right' ? 'md:order-2' : ''}`}>
             <div className="img-scale absolute inset-0 w-full h-full bg-atlas flex items-center justify-center">
               <Image 
                 src={row.img} 
                 alt={row.title} 
                 fill 
                 className="object-cover opacity-90"
                 referrerPolicy="no-referrer"
               />
               
               {/* R1: Riad overlay */}
               {i === 0 && <div className="absolute inset-0 zellige opacity-[0.25] bg-torii mix-blend-multiply pointer-events-none"></div>}
               {/* R2: Hands/Cup */}
               {i === 1 && <div className="absolute inset-0 bg-atlas/20 mix-blend-multiply pointer-events-none"></div>}
             </div>
          </div>

          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center relative text-block">
             {row.extraJP && <div className="absolute top-8 right-12 font-jp text-[8rem] text-atlas opacity-[0.03] pointer-events-none select-none">{row.extraJP}</div>}
             
             <div className="font-mono text-sm tracking-widest text-marrakech mb-8">{row.label}</div>
             <h2 className="font-display text-4xl md:text-6xl text-atlas mb-8 editorial-underline inline-block pb-4 self-start">
               <SplitReveal text={row.title} splitBy="word" elementType="span" />
             </h2>
             <div className="font-sans text-xl font-light leading-relaxed text-atlas/80 max-w-lg mb-8">
               <SplitReveal text={row.body} splitBy="word" delay={0.2} />
             </div>
             {row.extra && <div className="font-mono text-xs text-saffron tracking-widest uppercase mt-8">{row.extra}</div>}
          </div>

        </div>
      ))}
    </section>
  );
}
