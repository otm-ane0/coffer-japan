import { NavBar } from '@/components/NavBar';
import { ZelligeBg } from '@/components/ui/ZelligeBg';
import { MenuGrid } from '@/components/MenuGrid';
import { Footer } from '@/components/Footer';

export default function MenuPage() {
  return (
    <main className="relative w-full min-h-screen pt-20">
      <NavBar />
      <ZelligeBg />
      <div className="pt-24 px-6 md:px-16 pb-32 z-10 relative pointer-events-auto max-w-[1400px] mx-auto min-h-screen">
        <h1 className="font-display text-5xl md:text-[90px] leading-none mb-6 text-center">NOTRE MENU</h1>
        <p className="font-sans text-xl opacity-80 mb-20 text-center font-light uppercase tracking-widest text-saffron">Crafted with intention. Served with ceremony.</p>
        
        <MenuGrid />
      </div>
      <Footer />
    </main>
  );
}
