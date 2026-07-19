import Link from "next/link";
import { sections, site, wixThumb } from "./data";

const tiles = [
  ...sections.map((s) => ({
    href: `/sebastian/${s.slug}`,
    title: s.title,
    thumb: s.thumb,
  })),
  {
    href: "/sebastian/about",
    title: "About",
    thumb: site.aboutThumb,
  },
];

export default function SebastianHome() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group block">
            <div className="overflow-hidden">
              <img
                src={wixThumb(tile.thumb, 570, 669)}
                alt={tile.title}
                loading="lazy"
                className="aspect-[190/223] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <h2
              className="mt-3 text-xl text-neutral-800 transition-colors group-hover:text-black"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {tile.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
