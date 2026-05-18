'use client';
import { cn } from "@/lib/utils";

export function ZelligeBg({ opacity = 5, className }: { opacity?: number; className?: string }) {
  return (
    <div 
      className={cn("absolute inset-0 w-full h-full pointer-events-none z-0 zellige mix-blend-overlay", className)} 
      style={{ opacity: opacity / 100 }} 
    />
  );
}
