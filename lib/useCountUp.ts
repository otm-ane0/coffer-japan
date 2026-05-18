import { useState, useEffect, useRef } from "react";

export function useCountUp(target: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState("0" + suffix);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const p = Math.min(progress / duration, 1);
            const easeOutExpo = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            
            const current = Math.floor(easeOutExpo * target);
            setCount(current + suffix);
            
            if (p < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return { count, ref };
}
