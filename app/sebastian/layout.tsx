import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import { site } from "./data";
import SebNav from "./SebNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastian Piras — Photography",
  description:
    "Sebastian Piras is a New York based photographer and filmmaker. Portraits of artists, editorial photography, and film stills.",
  robots: { index: false, follow: false },
};

export default function SebastianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-white text-neutral-900`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <SebNav />
      <header className="mx-auto max-w-6xl px-6 pt-28 pb-8">
        <Link href="/sebastian" className="block">
          <h1
            className="text-4xl tracking-wide sm:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {site.name}
          </h1>
        </Link>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-20">{children}</main>
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-8 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
          <span>{site.copyright}</span>
        </div>
      </footer>
    </div>
  );
}
