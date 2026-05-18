'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }
    };

    const updateRing = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(updateRing);

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-saffron/60 pointer-events-none z-[10000] mix-blend-exclusion transition-all duration-300"
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-atlas rounded-full pointer-events-none z-[10001] mix-blend-exclusion border border-washi/50"
      />
    </>
  );
}
