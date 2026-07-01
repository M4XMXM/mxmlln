import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './decks.css';

// Self-hosted (not next/font/google) so decks build AND render with zero network
// access — the offline-presentation guarantee. Files live in ./fonts and are
// committed to the repo. System-font fallbacks keep text readable even if a
// face fails to load. Archivo is a variable woff2 spanning weights 100–900.
const archivo = localFont({
  src: './fonts/Archivo-Variable-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-archivo',
  fallback: ['system-ui', 'sans-serif'],
});

const homemadeApple = localFont({
  src: './fonts/HomemadeApple-Regular-latin.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-homemade-apple',
  fallback: ['cursive'],
});

// Playfair Display SemiBold — used only for the ornate ampersand on section
// titles. Self-hosted (latin subset) to keep the deck offline-safe.
const playfair = localFont({
  src: './fonts/PlayfairDisplay-SemiBold-latin.woff2',
  weight: '600',
  display: 'swap',
  variable: '--font-playfair',
  fallback: ['Georgia', 'serif'],
});

// Unlisted section: decks are live by URL but linked from nowhere and kept out
// of search + AI crawlers. robots here is inherited by every nested deck route.
// To "publish" a deck, link to it (nav / sketchbook) — that's the only switch.
export const metadata: Metadata = {
  title: 'Decks — Maximillian Piras',
  robots: { index: false, follow: false },
};

export default function DecksLayout({ children }: { children: React.ReactNode }) {
  // Layout supplies fonts + robots only. Chrome (logo, padding) lives on the
  // index page; individual decks render full-bleed for presenting.
  return (
    <div className={`decks-layout ${archivo.variable} ${homemadeApple.variable} ${playfair.variable}`}>
      {children}
    </div>
  );
}
