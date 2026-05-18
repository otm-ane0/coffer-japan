'use client';
import dynamic from 'next/dynamic';

export const SceneProviderClient = dynamic(
  () => import('./SceneProvider').then(m => m.SceneProvider),
  { ssr: false }
);
