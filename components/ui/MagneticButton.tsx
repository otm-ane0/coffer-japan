'use client';
import { useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'outline' | 'filled';
}

export function MagneticButton({ children, className = '', variant = 'filled', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !innerRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Limits
    const maxX = 22;
    const maxY = 22;
    ref.current.style.transform = `translate(${Math.max(Math.min(x, maxX), -maxX)}px, ${Math.max(Math.min(y, maxY), -maxY)}px)`;
    innerRef.current.style.transform = `translate(${x * -0.4}px, ${y * -0.4}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current || !innerRef.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
    innerRef.current.style.transform = `translate(0px, 0px)`;
  };

  const baseClasses = "relative px-8 py-4 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-300 pointer-events-auto group data-[cursor=hover]:true";
  const variants = {
    filled: "bg-marrakech text-white",
    outline: "border border-saffron bg-transparent text-washi"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
      style={{ transition: 'transform 0.5s cubic-bezier(0.3, 1, 0.3, 1)' }}
    >
      <span ref={innerRef} className="relative z-10 pointer-events-none w-full block" style={{ transition: 'transform 0.5s cubic-bezier(0.3, 1, 0.3, 1)' }}>
        {children}
      </span>
      {variant === 'filled' && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-torii to-marrakech opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow" />
      )}
    </motion.button>
  );
}
