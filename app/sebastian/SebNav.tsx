"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { href: "/sebastian", label: "Albums" },
  { href: "/sebastian/about", label: "About" },
  { href: "/sebastian/clients", label: "Clients" },
  { href: "/sebastian/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/sebastian") {
    // Albums is the default: active on the home grid and any album/section page,
    // i.e. anything that isn't About / Clients / Contact.
    return !items
      .filter((i) => i.href !== "/sebastian")
      .some((i) => pathname.startsWith(i.href));
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const glass = {
  backdropFilter: "blur(80px)",
  WebkitBackdropFilter: "blur(80px)",
  backgroundColor: "rgba(240, 240, 240, 0.65)",
  boxShadow: "0px 3px 30px 0px rgba(0, 0, 0, 0.15)",
  border: "solid 2px rgba(0, 0, 0, 0.1)",
} as const;

const itemFont = { fontFamily: "var(--font-cormorant), serif" } as const;
const itemBase =
  "text-[18px] font-medium tracking-wide text-black transition-opacity";

export default function SebNav() {
  const pathname = usePathname() ?? "/sebastian";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const activeLabel =
    items.find((i) => isActive(pathname, i.href))?.label ?? "Menu";

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // seb-lightbox is dispatched by Gallery so the nav can clear the overlay.
  useEffect(() => {
    const onLightbox = (e: Event) =>
      setHidden((e as CustomEvent<boolean>).detail === true);
    window.addEventListener("seb-lightbox", onLightbox);
    return () => window.removeEventListener("seb-lightbox", onLightbox);
  }, []);

  if (hidden) return null;

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-5 z-[900] flex justify-center px-4">
      {/* Desktop: segmented controller */}
      <div
        className="pointer-events-auto hidden items-center gap-1.5 rounded-[40px] p-1.5 sm:flex"
        style={glass}
      >
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-[40px] px-5 py-2 leading-none ${itemBase} ${
                active ? "bg-white" : "hover:opacity-50"
              }`}
              style={itemFont}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile: hamburger menu */}
      <div className="pointer-events-auto relative flex flex-col items-center sm:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 rounded-[40px] py-3 pl-5 pr-4"
          style={glass}
        >
          <span className={`leading-none ${itemBase}`} style={itemFont}>
            {activeLabel}
          </span>
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-[2px] w-full rounded-full bg-black transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full bg-black transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full bg-black transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        {open && (
          <div
            className="mt-2 flex w-44 flex-col gap-1 rounded-[24px] p-2"
            style={glass}
          >
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-[16px] px-5 py-3 text-center ${itemBase} ${
                    active ? "bg-white" : "hover:opacity-50"
                  }`}
                  style={itemFont}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
