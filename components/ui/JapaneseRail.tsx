import { cn } from "@/lib/utils";

export function JapaneseRail({ text, position = 'left', className }: { text: string; position?: 'left' | 'right'; className?: string }) {
  return (
    <div className={cn(
      "hidden xl:block absolute top-[25%] bottom-[25%] vertical-rail font-jp text-sm tracking-[0.4em] opacity-60 z-20",
      position === 'left' ? 'left-8 text-saffron' : 'right-8 text-marrakech',
      className
    )}>
      {text}
    </div>
  );
}
