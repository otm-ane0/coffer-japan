'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation';

export function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // On mount anim
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.set(panelRef.current, { clipPath: 'circle(150vmax at 0% 0%)' });
    gsap.to(panelRef.current, {
      clipPath: 'circle(0vmax at 0% 0%)',
      duration: 0.8,
      ease: 'power3.inOut',
      pointerEvents: 'none',
    });
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target?.href && target.host === window.location.host && !target.hasAttribute('target')) {
        const url = new URL(target.href);
        if (url.pathname !== window.location.pathname) {
          e.preventDefault();
          const rect = target.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          if (!panelRef.current) return;
          
          gsap.set(panelRef.current, { zIndex: 9999, pointerEvents: 'auto', clipPath: `circle(0px at ${x}px ${y}px)` });
          gsap.to(panelRef.current, {
            clipPath: `circle(150vmax at ${x}px ${y}px)`,
            duration: 0.7,
            ease: 'power4.inOut',
            onComplete: () => {
              router.push(url.pathname);
            }
          });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [router]);

  return (
    <div 
      ref={panelRef} 
      className="fixed inset-0 bg-atlas z-[-1] pointer-events-none origin-top-left" 
      style={{ clipPath: 'circle(0vmax at 0% 0%)' }}
    />
  );
}
