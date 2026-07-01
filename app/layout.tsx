import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (not next/font/google) so the whole app builds and renders with
// zero network access. Reuses the committed woff2 already used by the decks
// (app/decks/fonts). Archivo is a variable face spanning weights 100–900.
const archivo = localFont({
  src: "./decks/fonts/Archivo-Variable-latin.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const homemadeApple = localFont({
  src: "./decks/fonts/HomemadeApple-Regular-latin.woff2",
  weight: "400",
  variable: "--font-homemade-apple",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "Interaction Sketchbook - Maximillian Piras",
  description: "Interaction Sketchbook — a collection of interactive experiments exploring the intersection of AI and user experience design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${homemadeApple.variable}`}>
      <body>{children}</body>
    </html>
  );
}
