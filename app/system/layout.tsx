import type { Metadata } from 'next';
import { Archivo, Homemade_Apple } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-archivo',
});

const homemadeApple = Homemade_Apple({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-homemade-apple',
});

export const metadata: Metadata = {
  title: 'Design System — Maximillian Piras',
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`system-layout ${archivo.variable} ${homemadeApple.variable}`}>
      <div className="system-logo">
        <a href="/" aria-label="Back to maximin.design">
          <img src="/assets/Sig2026.gif" alt="MXMLLN" width={100} height={100} />
        </a>
      </div>
      {children}
    </div>
  );
}
