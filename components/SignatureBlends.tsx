'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/MagneticButton';
import { useMouseParallax } from '@/lib/useMouseParallax';
import { motion, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

const blends = [
  {
    num: "01", nameJP: "アトラス・ノワール", nameEN: "ATLAS NOIR", color: "text-marrakech",
    origin: "Morocco × Ethiopia", notes: ["Dark Chocolate", "Cedar", "Orange Blossom"],
    desc: "A single-origin Ethiopian washed, finished with cedar-smoked Moroccan oak. Dark, decisive, unapologetic.",
    price: "35 MAD", icon: "☕", img: "https://picsum.photos/seed/atlasnoir_blend/800/1000"
  },
  {
    num: "02", nameJP: "サクラ・スペシャル", nameEN: "SAKURA SPÉCIAL", color: "text-torii",
    origin: "Japan × Yemen", notes: ["Cherry Blossom", "Jasmine", "White Honey"],
    desc: "Yemeni beans cold-brewed with Yoshino cherry water. A love letter written in two alphabets.",
    price: "55 MAD", icon: "🌸", img: "https://picsum.photos/seed/sakura_blend/800/1000"
  },
  {
    num: "03", nameJP: "ムスクの夢", nameEN: "RÊVE DE MUSC", color: "text-saffron",
    origin: "Morocco × Indonesia", notes: ["Musk Rose", "Cardamom", "Dark Caramel"],
    desc: "Sumatran beans roasted over Moroccan rose wood. A dream you don't want to wake from.",
    price: "50 MAD", icon: "🌙", img: "https://picsum.photos/seed/musc_blend/800/1000"
  }
];

function BlendCard({ blend }: { blend: typeof blends[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(cardRef.current, {
      rotateY: (x / rect.width) * 30,
      rotateX: -(y / rect.height) * 20,
      y: -10,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass w-[85vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] h-[70vh] max-h-[800px] flex-shrink-0 relative overflow-hidden group rounded-xl p-8 md:p-12 flex flex-col justify-between"
      style={{ perspective: 800 }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <Image 
          src={blend.img}
          alt={blend.nameEN}
          fill
          className="object-cover opacity-20 filter grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-40 group-hover:grayscale-0 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-2 zellige opacity-40 bg-marrakech mix-blend-color z-10"></div>
      <div className="absolute top-4 right-8 font-display text-[8rem] opacity-10 pointer-events-none select-none text-washi z-10">{blend.num}</div>
      
      <div className="relative z-10">
        <div className="text-4xl mb-6 opacity-80">{blend.icon}</div>
        <div className="font-jp text-sm text-washi/60 tracking-widest mb-2">{blend.nameJP}</div>
        <h3 className="font-display text-4xl lg:text-5xl text-washi editorial-underline inline-block pb-2 mb-8">{blend.nameEN}</h3>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {blend.notes.map((note, i) => (
            <span key={i} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-marrakech text-washi/80 rounded-full bg-marrakech/10">
              {note}
            </span>
          ))}
        </div>
        
        <p className="font-sans text-lg text-washi/80 leading-relaxed font-light">
          {blend.desc}
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between mt-8">
        <div className="font-mono text-saffron text-xl tracking-widest">{blend.price}</div>
        <MagneticButton variant="outline" className="py-3 px-6 text-xs border-saffron/50 group-hover:border-saffron">
          COMMANDER →
        </MagneticButton>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-washi/10 to-transparent translate-x-[-150%] skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
    </div>
  );
}

export function SignatureBlends() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) return;

    let getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${track.scrollWidth}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.trigger === sectionRef.current && t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full lg:h-screen bg-atlas py-24 lg:py-0 overflow-hidden diagonal-bottom z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12 lg:hidden">
        <h2 className="font-mono text-sm text-marrakech tracking-[0.3em] uppercase">Signature Blends</h2>
        <div className="font-display text-4xl text-washi mt-4">DISCOVER OUR CRAFT</div>
      </div>
      
      <div className="h-full flex items-center">
        <div ref={trackRef} className="flex flex-col lg:flex-row gap-12 lg:gap-24 px-6 md:px-16 lg:px-[10vw]">
          {blends.map((blend, i) => (
            <BlendCard key={i} blend={blend} />
          ))}
        </div>
      </div>
    </section>
  );
}
