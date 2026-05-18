'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full h-24 flex items-center justify-between px-6 md:px-16 z-[100] pointer-events-auto">
        <div className="flex items-center gap-2 md:gap-4 relative z-[101]">
          <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-saffron flex items-center justify-center rotate-45 flex-shrink-0">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-marrakech -rotate-45"></div>
          </div>
          <span className="font-display text-base md:text-lg tracking-[0.1em] md:tracking-[0.2em] uppercase text-washi truncate max-w-[150px] xs:max-w-none">Café Marrakech</span>
        </div>
        
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 text-[11px] font-mono tracking-[0.3em] uppercase opacity-70 text-washi">
          <li className="hover:text-saffron cursor-pointer pointer-events-auto transition-colors duration-300">
            <Link href="/#about">L&apos;Origine</Link>
          </li>
          <li className="hover:text-saffron cursor-pointer pointer-events-auto transition-colors duration-300">
            <Link href="/menu">Le Menu</Link>
          </li>
          <li className="hover:text-saffron cursor-pointer pointer-events-auto transition-colors duration-300">
            <Link href="/sakura">Sakura Experience</Link>
          </li>
          <li className="hover:text-saffron cursor-pointer pointer-events-auto transition-colors duration-300 text-marrakech">
            <Link href="/#reserve">Réserver</Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-saffron relative z-[101]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.3, 1, 0.3, 1] }}
            className="fixed inset-0 min-h-screen h-[100dvh] bg-atlas z-[90] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
          >
            <div className="absolute inset-0 zellige opacity-[0.05]"></div>
            <ul className="flex flex-col gap-10 text-center text-sm font-mono tracking-[0.4em] uppercase text-washi relative z-10">
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/#about" onClick={() => setIsOpen(false)}>L&apos;Origine</Link>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/menu" onClick={() => setIsOpen(false)}>Le Menu</Link>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/sakura" onClick={() => setIsOpen(false)}>Sakura Experience</Link>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-marrakech"
              >
                <Link href="/#reserve" onClick={() => setIsOpen(false)}>Réserver</Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
