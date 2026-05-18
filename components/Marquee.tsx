import { cn } from "@/lib/utils";

export function Marquee({ className, reverse }: { className?: string; reverse?: boolean }) {
  const items = [
    { text: "CAFÉ MARRAKECH", font: "font-display text-washi" },
    { text: "珈琲マラケシュ", font: "font-jp text-saffron" },
    { text: "قهوة مراكش", font: "font-display text-washi" },
    { text: "ATLAS × KYOTO", font: "font-jp text-saffron" },
    { text: "EST. 2024", font: "font-display text-washi" }
  ];

  return (
    <div className={cn("relative w-full overflow-hidden bg-atlas py-4 flex items-center group", className)}>
      <div className="absolute left-0 right-0 h-[2px] bg-marrakech top-1/2 -translate-y-1/2 z-0"></div>
      <div className={cn("flex space-x-12 whitespace-nowrap z-10 w-max animate-marquee", reverse && "direction-reverse", "group-hover:[animation-play-state:paused]")}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex space-x-12 items-center">
            {items.map((item, j) => (
              <span key={`${i}-${j}`} className={cn("text-2xl md:text-4xl uppercase tracking-widest px-4 bg-atlas", item.font)}>
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
