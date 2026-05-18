import { cn } from "@/lib/utils";

export function BrandStamp({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-24 h-24 rounded-full border-2 border-saffron flex items-center justify-center animate-[spin_60s_linear_infinite] data-[cursor=hover]:true", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
        <text className="font-mono text-[9px] uppercase tracking-widest" fill="currentColor">
          <textPath href="#circlePath" startOffset="0%">
            珈琲マラケシュ · EST.2024 · MARRAKECH ·
          </textPath>
        </text>
      </svg>
    </div>
  );
}
