import type { Metadata } from 'next';
import { Cinzel_Decorative, Noto_Serif_JP, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/ui/LenisProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { SceneProviderClient } from '@/components/three/SceneProviderClient';
import { PageTransition } from '@/components/ui/PageTransition';

const cinzel = Cinzel_Decorative({
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const notoJP = Noto_Serif_JP({
  weight: ['700'],
  preload: false,
  variable: '--font-noto-jp',
  display: 'swap',
});

const rajdhani = Rajdhani({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Café Marrakech',
  description: 'OÙ L\'ATLAS RENCONTRE KYOTO. Where Atlas Mountains meet Kyoto dawn.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${cinzel.variable} ${notoJP.variable} ${rajdhani.variable} ${jetbrains.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-washi bg-atlas">
        <LenisProvider>
          <PageTransition />
          <CustomCursor />
          <GrainOverlay />
          <SceneProviderClient />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
