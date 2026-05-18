import { cn } from "@/lib/utils";

export function ArabesqueCorner({ position = 'top-left', className }: { position?: 'top-left' | 'bottom-right'; className?: string }) {
  const isTopLeft = position === 'top-left';
  return (
    <svg 
      className={cn("absolute w-24 h-24 opacity-40 pointer-events-none", isTopLeft ? 'top-8 left-8' : 'bottom-8 right-8 rotate-180', className)} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        className="path-draw"
        d="M0 0 V100 C0 44.77 44.77 0 100 0 H0 Z" 
        stroke="var(--color-saffron)" 
        strokeWidth="1.5"
      />
      <path 
        className="path-draw"
        d="M10 10 V80 C10 41.34 41.34 10 80 10 H10 Z" 
        stroke="var(--color-saffron)" 
        strokeWidth="0.5" 
        strokeDasharray="4 4"
      />
    </svg>
  );
}
