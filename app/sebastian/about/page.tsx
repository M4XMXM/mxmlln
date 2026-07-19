import { bio, exhibitions, site, wixImage } from "../data";

export default function AboutPage() {
  return (
    <div>
      <h2
        className="mb-8 text-3xl"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        About
      </h2>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700">
          {bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <img
          src={wixImage(site.aboutThumb, 900)}
          alt="Sebastian Piras"
          loading="lazy"
          className="h-auto w-full object-cover"
        />
      </div>

      <h3
        className="mb-6 mt-16 text-2xl"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        Exhibitions, Films &amp; Collections
      </h3>
      <div className="space-y-10">
        {exhibitions.map((entry) => (
          <div key={entry.period} className="grid gap-2 sm:grid-cols-[140px_1fr]">
            <div className="text-[13px] font-medium uppercase tracking-[0.15em] text-neutral-400">
              {entry.period}
            </div>
            <ul className="space-y-2 text-[14px] leading-relaxed text-neutral-700">
              {entry.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
