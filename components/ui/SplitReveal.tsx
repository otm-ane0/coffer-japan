'use client';
import { useRef, useEffect, JSX } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface SplitRevealProps {
  text: string;
  className?: string;
  elementType?: React.ElementType;
  splitBy?: 'char' | 'word';
  delay?: number;
}

export function SplitReveal({ text, className, elementType: Component = 'div', splitBy = 'char', delay = 0 }: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.split-item');
    
    const tl = gsap.fromTo(elements, 
      { y: '110%', opacity: 0, rotateX: 20 },
      { 
        y: '0%', 
        opacity: 1, 
        rotateX: 0,
        duration: 0.8, 
        ease: 'power4.out',
        stagger: splitBy === 'char' ? 0.02 : 0.05,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    return () => { tl.kill() };
  }, [splitBy, delay]);

  const items = splitBy === 'char' ? text.split('') : text.split(' ');

  return (
    <Component ref={containerRef as any} className={cn("inline-flex flex-wrap relative", className)}>
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block relative py-1 drop-shadow-sm">
          <span className="split-item inline-block transform will-change-transform opacity-0">
            {item === ' ' ? '\u00A0' : item}
          </span>
          {splitBy === 'word' && i < items.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}
