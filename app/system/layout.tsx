import type { Metadata } from 'next';
import { Archivo, Homemade_Apple } from 'next/font/google';
import { SiteLogo } from '../components/SiteLogo';

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
