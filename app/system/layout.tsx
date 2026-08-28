import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteLogo } from '../components/SiteLogo';

// Self-hosted so the app builds/renders with zero network (see app/layout.tsx).
const archivo = localFont({
  src: '../decks/fonts/Archivo-Variable-latin.woff2',
  weight: '100 900',
  variable: '--font-archivo',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const homemadeApple = localFont({
  src: '../decks/fonts/HomemadeApple-Regular-latin.woff2',
  weight: '400',
  variable: '--font-homemade-apple',
  display: 'swap',
  fallback: ['cursive'],
});

export const metadata: Metadata = {
  title: 'Design System — Maximillian Piras',
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`system-layout ${archivo.variable} ${homemadeApple.variable}`}>
      <SiteLogo
        href="/"
        ariaLabel="Back to maximin.design"
        spin
        className="system-logo"
        lottieClassName="system-logo-lottie"
      />
      {children}
    </div>
  );
}
