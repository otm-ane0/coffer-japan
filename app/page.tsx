import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { ZelligeBg } from '@/components/ui/ZelligeBg';
import { About } from '@/components/About';
import { SignatureBlends } from '@/components/SignatureBlends';
import { Atmosphere } from '@/components/Atmosphere';
import { HomeCTA } from '@/components/HomeCTA';
import { Footer } from '@/components/Footer';
import { Marquee } from '@/components/Marquee';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <NavBar />
      <ZelligeBg />
      <Hero />
      <Marquee />
      <About />
      <SignatureBlends />
      <Marquee reverse />
      <Atmosphere />
      <HomeCTA />
      <Footer />
    </main>
  );
}
