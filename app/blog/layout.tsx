import type { Metadata } from "next";
import localFont from "next/font/local";
import { BlogLogo } from "./BlogLogo";
import "./blog.css";

// Self-hosted so the app builds/renders with zero network (see app/layout.tsx).
const archivo = localFont({
  src: "../decks/fonts/Archivo-Variable-latin.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const homemadeApple = localFont({
  src: "../decks/fonts/HomemadeApple-Regular-latin.woff2",
  weight: "400",
  variable: "--font-homemade-apple",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "Blog by Maximillian Piras",
  description: "Writing on software design (UX, UI, AI & so on).",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`blog-layout ${archivo.variable} ${homemadeApple.variable}`}>
      <BlogLogo />
      {children}
    </div>
  );
}
